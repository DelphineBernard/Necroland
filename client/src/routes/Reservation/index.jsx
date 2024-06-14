import { useEffect, useState, useContext } from "react";
import { Context } from '../../components/Context';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/dateUtils.js';
import { useNavigate } from "react-router-dom";
import API_URL from '../../config.js';
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, List, ListItem, Typography, Button, Divider, Alert } from "@mui/material";
import FormField from "../../components/FormField/index.jsx";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import EuroIcon from '@mui/icons-material/Euro';
import { grey, red } from "@mui/material/colors";

// Function to fetch price depending on reservation choices (with or without hotel + duration selected)
const calculateTotalPrice = (allPrices, durationSelected, hotelSelected) => {
    try {
        // Conversion of price.hotel(booleen in BDD) to string to compare to hotelSelected (string)
        const selectedPrice = allPrices.find(price => price.duration == durationSelected && String(price.hotel) === hotelSelected)

        if (selectedPrice) {
            return selectedPrice.price;
        } else {
            throw new Error('Aucun prix correspondant trouvé');
        }
    } catch (error) {
        console.error("Erreur le prix n'a pas pu être calculé:", error.message);
        return null;
    }
}

const Reservation = () => {
    const [hotelSelected, setHotelSelected] = useState(null);
    const [durationSelected, setDurationSelected] = useState(null);
    const [nbPeopleSelected, setNbPeopleSelected] = useState(1);
    const [cgvChecked, setCgvChecked] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [stringStartDate, setStringStartDate] = useState(null);
    const [stringEndDate, setStringEndDate] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch prices from bdd with Context
    const { allPrices, setAllPrices } = useContext(Context);

    // Use userId from store
    const userId = useSelector((state) => state.auth.userId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrices = async () => {
            const response = await fetch(`${API_URL}/prices`);
            const data = await response.json();
            setAllPrices(data.prices);
        };
        fetchPrices();
    }, []);


    // If we switch from "sans hôtel" to "avec hôtel" althrough duration selected is 1 day, it define by default duration to 2 days (min duration with hotel)
    useEffect(() => {
        if (hotelSelected === "true" && durationSelected === "1") {
            setDurationSelected("2");
        }
    }, [hotelSelected]);

    useEffect(() => {
        const totalPrice = calculateTotalPrice(allPrices, durationSelected, hotelSelected);
        setTotalPrice(totalPrice);
        if (startDate && durationSelected) {
            updateEndDate(startDate, durationSelected);
        }
    }, [allPrices, hotelSelected, durationSelected, startDate]);

    const handleHotelChange = (event) => {
        setHotelSelected(event.target.value)
    };

    const handleNbPeopleChange = (event) => {
        const value = event.target.value;
        if (value === '' || (Number(value) > 0 && Number(value) <= 99)) {
            setNbPeopleSelected(value);
        };
    };

    // Allows only numeric character on "number of people input"
    const handleKeyDown = (event) => {
        const key = event.key;
        if (!/[0-9]/.test(key) && 
            key !== 'Backspace' && 
            key !== 'Delete' && 
            key !== 'ArrowLeft' && 
            key !== 'ArrowRight') {
            event.preventDefault();
        }
    };

    const handleDurationChange = (event) => {
        setDurationSelected(event.target.value)
    };

    const handleCheckboxChange = (event) => {
        setCgvChecked(event.target.checked);
    };

    const handleStartDateChange = (event) => {
        const startDate = event.target.value
        setStartDate(startDate);
    };

    const updateEndDate = () => {
        // Create complete dates with method Date(), create end date from start date with adding number of days (duration selected)
        const fullStartDate = new Date(startDate);
        const fullEndDate = new Date(startDate);

        // Add duration to end date (durationSelected = string to transform in integer) less 1 day
        fullEndDate.setDate(fullStartDate.getDate() + parseInt(durationSelected) - 1);

        // Options to obtain string date for selection part (day, date, month, year)
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

        setStringStartDate(formatDate(fullStartDate, options));
        setStringEndDate(formatDate(fullEndDate, options));

        // Format end date to add it into form (format to YYYY-MM-JJ)
        const shortOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formEndDate = formatDate(fullEndDate, shortOptions).split('/').reverse().join('-')
        setEndDate(formEndDate);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!hotelSelected || !durationSelected || !startDate || !endDate || !cgvChecked) {
            setErrorMessage("Veuillez remplir tous les champs et accepter les conditions générales de vente.");
            return;
        }
        try {
            const formData = new FormData(event.target)
            const reservationData = Object.fromEntries(formData.entries());
            reservationData.user_id = userId

            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/reservations`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });

            if (response.ok) {
                navigate('/profil');
            } else {
                alert('Erreur lors de la réservation.');
            }
        } catch (error) {
            console.log(error)
        };
    };

    return (
        <main className="center">

            <Typography 
                variant="h2" 
                sx={{ textAlign: "center", p: '1rem' }}>
                Choix des options
            </Typography>

            <form method="post" onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: "space-around", rowGap: '1rem', color: 'white' }}>

{/* ------------------------- Input Hotel --------------------------- */}
                    <FormControl 
                        component="fieldset">
                        <Divider 
                            sx={{ backgroundColor: 'transparent', '&::before, &::after': { borderColor: red[400] } }}>
                            <FormLabel sx={{ color: "white" }} component="legend">
                                Hôtel
                            </FormLabel>
                        </Divider>
                        <RadioGroup 
                            row 
                            name="hotel" 
                            value={hotelSelected} 
                            onChange={handleHotelChange} 
                            sx={{ color: "white", display: 'flex', justifyContent: "space-evenly" }} 
                            required
                        >
                            <FormControlLabel 
                                sx={{ color: "white" }}
                                value="true" 
                                control={<Radio id="true" sx={{ color: "white"}} />} 
                                label="Avec hôtel" />
                            <FormControlLabel 
                                value="false" 
                                control={<Radio id="false" sx={{ color: "white"}} />} 
                                label="Sans hôtel" />
                        </RadioGroup>
                    </FormControl>

{/* --------------------- Input number of people ---------------------- */}
                    <FormControl 
                        component="fieldset" 
                        sx={{ display: 'flex' }}>
                        <Divider 
                            sx={{ backgroundColor: 'transparent', '&::before, &::after': { borderColor: red[400] } }}>
                            <FormLabel 
                                sx={{ color: "white" }} 
                                component="label">
                                Nombre de personnes
                            </FormLabel>
                        </Divider>
                        <FormField sx={{
                            color: "white", maxWidth: '40%', mx: 'auto', '& .MuiInputBase-input': {color: 'white'}}}
                            id="nb_people"
                            type="number"
                            name="nb_people"
                            htmlFor="nb_people"
                            size="small"
                            value={nbPeopleSelected}
                            onChange={handleNbPeopleChange}
                            onKeyDown={handleKeyDown}
                            inputProps={{ min: 1 }}
                            defaultValue={1}
                        />
                    </FormControl>

{/* -------------------------- Input duration ----------------------- */}
                    <FormControl component="fieldset" >
                        <Divider 
                            sx={{ backgroundColor: 'transparent', '&::before, &::after': { borderColor: red[400] } }}>
                            <FormLabel 
                                sx={{ color: "white", '&.Mui-focused': { color: 'white' } }} 
                                component="legend">
                                Durée du séjour
                            </FormLabel>
                        </Divider>

                        {/* 1 day duration only showed if hotel not selected */}
                        <RadioGroup 
                            sx={{ display: 'flex', justifyContent: 'center' }} row 
                            name="duration" 
                            onChange={handleDurationChange}>
                            {hotelSelected !== "true" && 
                            <FormControlLabel 
                                value="1" 
                                control={<Radio id="1" 
                                sx={{ color: "white"}} />} 
                                label="1 jour" />}
                            <FormControlLabel 
                                value="2" 
                                control={<Radio id="2" 
                                sx={{ color: "white"}} />} 
                                label="2 jours" />
                            <FormControlLabel 
                                value="3" 
                                control={<Radio id="3" 
                                sx={{ color: "white"}} /> } 
                                label="3 jours" />
                            <FormControlLabel 
                                value="4" 
                                control={<Radio id="4" 
                                sx={{ color: "white"}} />} 
                                label="4 jours" />
                        </RadioGroup>
                    </FormControl>

{/*  ---------------------- Input dates ------------------------------ */}
                    <FormControl component="fieldset">
                        <Divider 
                            sx={{ backgroundColor: 'transparent', '&::before, &::after': { borderColor: red[400] } }}>
                            <FormLabel 
                                sx={{ color: "white" }} component="legend">
                                Dates
                            </FormLabel>
                        </Divider>
                        <Box 
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', rowGap: '1rem', textAlign: 'center' }}>
                            <Box 
                                sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-evenly', columnGap: '1rem' }}>
                                <FormLabel 
                                    sx={{ color: 'white' }} 
                                    htmlFor="start_date">
                                    Du 
                                </FormLabel>
                                <FormField 
                                    sx={{ width: '60%', '& .MuiInputBase-input': {color: 'white'}}} 
                                    type="date" 
                                    name="start_date" 
                                    id="start_date" 
                                    inputProps={{
                                        min: "2024-07-01"
                                    }} 
                                    size="small" 
                                    onChange={handleStartDateChange} 
                                />
                            </Box>
                            <Box 
                                sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-evenly', columnGap: '1rem' }}>
                                <FormLabel 
                                    sx={{ color: 'white' }} 
                                    htmlFor="end_date">
                                    au
                                </FormLabel>
                                <FormField 
                                    sx={{ width: '60%', '& .MuiInputBase-input': { color: '#9e9e9e'}}}
                                    type="date" 
                                    name="end_date" 
                                    id="end_date" 
                                    value={endDate} 
                                    size="small"
                                    InputProps={{ readOnly: true }} 
                                />
                            </Box>
                        </Box>
                    </FormControl>

{/* ------------------- Resume selection ---------------------------- */}
                    <Box 
                        sx={{ width: '100%', alignSelf:"center", p: 3, border: '1px solid', borderColor: grey[800], borderRadius: '0.5rem' }}>
                        <Typography variant="h2">Votre sélection</Typography>

                        {/* If hotel and duration are not selected */}
                        {!hotelSelected &&
                        !durationSelected &&
                        <Typography>
                            Choisissez vos options de séjour
                        </Typography>}

                        {/* If hotel or duration are selected, show selection */}
                        {(hotelSelected || durationSelected) &&
                            <List>
                                <ListItem>
                                    <CalendarMonthIcon />
                                    {!stringStartDate &&
                                        <>
                                            Dates
                                            <HelpOutlineIcon />
                                        </>}
                                    {stringStartDate && stringEndDate &&
                                        `Du ${stringStartDate} au ${stringEndDate}`}
                                </ListItem>
                                <Divider component="li" />
                                <ListItem>
                                    <HotelIcon />
                                    {!hotelSelected &&
                                        <>
                                            Hôtel
                                            <HelpOutlineIcon />
                                        </>}
                                    {/* If duration is not selected, show "hôtel compris" */}
                                    {hotelSelected && hotelSelected === "true" && "Hôtel compris"}

                                    {/* If duration is selected, show number of nights (duration of stay less one day) */}
                                    {/* ParseInt duration (string in form to number) */}
                                    {/* Handle number of nights "s" de nuit : if duration équal 2 days = stay one "night", if more than 2, display "nights". */}
                                    {hotelSelected 
                                    && hotelSelected === "true" 
                                    && durationSelected 
                                    && parseInt(durationSelected) >= 2 
                                    && ` pour ${durationSelected - 1} ${parseInt(durationSelected) > 2 ? "nuits" : "nuit"}`}
                                    {hotelSelected && hotelSelected === "false" && "Sans hôtel"}
                                </ListItem>

                                <Divider component="li" />
                                <ListItem>
                                    <LocalActivityIcon />
                                    {!durationSelected &&
                                        <>
                                            <Typography>Durée du séjour</Typography>
                                            <HelpOutlineIcon />
                                        </>}
                                    {durationSelected &&
                                     `Parc ${durationSelected} ${parseInt(durationSelected) > 1 ? "jours" : "jour"}`}
                                </ListItem>

                                <Divider component="li" />
                                <ListItem>
                                    <EmojiPeopleIcon />
                                    Nombre de personnes: {nbPeopleSelected}
                                </ListItem>

                                <Divider component="li" />
                                <ListItem>
                                    <EuroIcon />
                                    Prix total: {!totalPrice ? <HelpOutlineIcon /> : (totalPrice * nbPeopleSelected) + ' € TTC'}
                                </ListItem>
                                <Typography className="info">
                                    Le paiement s'effectuera sur place lors de votre arrivée.
                                </Typography>
                            </List>}
                    </Box>

{/* --------------------------Checkbox CGV ------------------------- */}
                    <Box 
                        sx={{ display: 'flex', alignItems: 'center', mx: 'auto' }}>
                        <Checkbox 
                            type="checkbox" 
                            name="cgv" 
                            id="cgv" 
                            onChange={handleCheckboxChange} 
                            sx={{ color: "white"}}
                        />
                        <FormLabel htmlFor="cgv"> 
                            <a href="/cgv" target="_blank">
                                J'accepte les conditions générales de vente
                            </a>.
                        </FormLabel>
                    </Box>
                                        
                    {errorMessage && 
                    <Alert 
                        sx={{ display: "flex", alignItems: "center" }}severity="error" 
                        variant="outlined">
                        {errorMessage} 
                    </Alert>}

                    <Button sx={{ mx: 'auto' }} type="submit">
                        Confirmer la réservation
                    </Button>
                </Box>
            </form>
        </main>
    )
}

export { Reservation, calculateTotalPrice };