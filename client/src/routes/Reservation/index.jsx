import { useEffect, useState, useContext } from "react";
import { Context } from '../../components/Context';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/dateUtils.js';
import { useNavigate } from "react-router-dom";
import API_URL from '../../config.js';
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import FormField from "../../components/FormField/index.jsx";
import Divider from '@mui/material/Divider';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import EuroIcon from '@mui/icons-material/Euro';
import { grey, red } from "@mui/material/colors";

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

    // On récupère le tableau des tarifs de la BDD avec le contexte
    const { allPrices, setAllPrices } = useContext(Context);

    // Je récupère mon userId stocké dans le store
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


    // Si on passe de "sans hôtel" à "avec hôtel" alors que le séjour sélectionnée est de 1 jour, on défini par défaut la durée de séjour à 2 jours (durée minimum)
    useEffect(() => {
        if (hotelSelected === "true" && durationSelected === "1"){
            setDurationSelected("2");
        }
    }, [hotelSelected]);

    useEffect(() => {
        calculeTotalPrice();
        if (startDate && durationSelected) {
            updateEndDate(startDate, durationSelected);
        }
    }, [hotelSelected, durationSelected, startDate]);

    // Fonction pour récupérer le bon tarif selon le choix de réservation (avec ou sans hôtel + durée du séjour)
    const calculeTotalPrice = () => {
        try {
            // Conversion de price.hotel(booleen dans la bdd) en string pour le comparer à hotelSelected (string)
            const selectedPrice = allPrices.find(price => price.duration == durationSelected && String(price.hotel) === hotelSelected)

            if (selectedPrice){
                setTotalPrice(selectedPrice.price)
            }
        } catch (error) {
            return "Erreur le prix n'a pas pu être calculé"
        } 
    }

    const handleHotelChange = (event) => {
        setHotelSelected(event.target.value)
    }

    const handleNbPeopleChange = (event) => {
        setNbPeopleSelected(event.target.value)
    }

    const handleDurationChange = (event) => {
        setDurationSelected(event.target.value)
    }

    const handleCheckboxChange = (event) => {
        setCgvChecked(event.target.checked);
    }

    const handleStartDateChange = (event) => {
        const startDate = event.target.value
        setStartDate(startDate);
    }

    const updateEndDate = () => {
        // On récupère les dates complètes avec la methode Date(), on récupère la date de fin à partir de la date de début pour lui ajouter le nombre de jours nécessaires dans un second temps
        const fullStartDate = new Date(startDate);
        const fullEndDate = new Date(startDate);

        // On ajoute à la date de fin la durée du séjour (durationSelected = string à transformer en int) - 1 jour (car sinon on obtient un jour de trop)
        fullEndDate.setDate(fullStartDate.getDate() + parseInt(durationSelected) -1);
        
        // Options permettant d'obtenir le format de date en string pour la partie sélection (jour de la semaine, date, mois, année)
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

        setStringStartDate(formatDate(fullStartDate, options));
        setStringEndDate(formatDate(fullEndDate, options));

        // On formate la date de fin pour l'intégrer dans le form (et on la transforme en format form soit YYYY-MM-JJ)
        const shortOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formEndDate = formatDate(fullEndDate, shortOptions).split('/').reverse().join('-')
        setEndDate(formEndDate);
    }

    const handleReservation = (event) => {
        if (!cgvChecked){
            event.preventDefault();
            alert("Veuillez accepter les conditions générales de vente pour confirmer votre réservation.");
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target)
            const reservationData = Object.fromEntries(formData.entries());
            reservationData.user_id = userId

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/reservation`, {
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
        }
    };    

    return (
        <main>

        <Typography variant="h2">Choix des options</Typography>

        <form method="post" onSubmit={handleSubmit}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: '1rem', width: '100%', color: 'white'}}>
            <FormControl component="fieldset">
                <Divider sx={{ backgroundColor: 'transparent', '&::before, &::after': { borderColor: red[400],  } }}>
                    <FormLabel sx={{ color: "white", '&.Mui-focused': { color: 'white' } }} component="legend">
                    Hôtel
                    </FormLabel>
                </Divider>
                <RadioGroup row name="hotel" value={hotelSelected} onChange={handleHotelChange} sx= {{ display: 'flex', justifyContent: "space-around"}} required>
                    <FormControlLabel value="true" control={<Radio  id="true" />} label="Avec hôtel" />
                    <FormControlLabel value="false" control={<Radio id="false" />} label="Sans hôtel" />
                </RadioGroup>
            </FormControl>

            <FormControl sx= {{ display: 'flex', rowGap: '1rem'}}>
                <Divider sx={{ backgroundColor: 'transparent', '&::before, &::after': { borderColor: red[400] } }}>
                    <FormLabel sx={{ color: "white" }} component="label">
                    Nombre de personnes
                    </FormLabel>
                </Divider>
                <FormField sx={{ color: "white", maxWidth: '80%', mx:'auto' }}
                    id="nb_people"
                    type="number"
                    name="nb_people"
                    htmlFor="nb_people"
                    inputProps={{ min: 1 }}
                    defaultValue={1} 
                    onChange={handleNbPeopleChange}
                    />  
            </FormControl>
                
            <FormControl component="fieldset">
                <Divider sx={{ backgroundColor: 'transparent', '&::before, &::after': { borderColor: red[400] } }}>
                    <FormLabel sx={{ color: "white", '&.Mui-focused': { color: 'white' } }} component="legend">
                        Durée du séjour
                    </FormLabel>
                </Divider>
                
                {/* La durée du séjour 1 jour est affichée uniquement si on ne prend pas d'hôtel (avec hôtel le séjour sera de 2 jours minimum) */}
                <RadioGroup sx={{ mx: 'auto' }}row name="duration" value={durationSelected} onChange={handleDurationChange}>
                    {hotelSelected !== "true" && <FormControlLabel value="1" control={<Radio id="1" />} label="1 jour" />}
                    <FormControlLabel value="2" control={<Radio id="2" />} label="2 jours" />
                    <FormControlLabel value="3" control={<Radio id="3" />} label="3 jours" />
                    <FormControlLabel value="4" control={<Radio id="4" />} label="4 jours" />
                </RadioGroup>
            </FormControl>  
            
            <FormControl component="fieldset">
                <Divider sx={{ backgroundColor: 'transparent', '&::before, &::after': { borderColor: red[400],  } }}>
                    <FormLabel sx={{ color: "white" }} component="legend">
                        Dates
                    </FormLabel>
                </Divider>
                <Box sx= {{ display: 'flex', justifyContent: "space-around", textAlign: 'center'}}>
                    <Box sx= {{ display: 'flex', flexDirection: 'column'}}>
                        <FormLabel sx= {{ color: 'white'}}htmlFor="start_date">Du</FormLabel>
                        <FormField type="date"  name="start_date" onChange={handleStartDateChange}/>
                    </Box>
                    <Box sx= {{ display: 'flex', flexDirection: 'column', justifyContent: "center"}}>
                        <FormLabel sx= {{ color: 'white'}}htmlFor="end_date">au</FormLabel>
                        <FormField sx= {{ color: 'white'}} type="date" name="end_date" value={endDate} 
                        InputProps={{ readOnly: true }} />
                    </Box>                  
                </Box>
            </FormControl>

            <Box sx= {{ width: '100%', p: 3, border: '1px solid', borderColor: grey[800], borderRadius: '0.5rem'}}>
                <Typography variant="h2">Votre sélection</Typography>
                {/* Si l'hôtel et la durée ne sont pas sélectionnés */}
                {!hotelSelected && !durationSelected && <p>Choisissez vos options de séjour</p>}
                {/* Si l'hôtel ou la durée sont sélectionnés on affiche la sélection */}
                {(hotelSelected || durationSelected) &&
                <List>
                    <ListItem><CalendarMonthIcon />
                        {!stringStartDate && 
                        <>
                            <Typography>Dates</Typography>
                            <HelpOutlineIcon/>
                        </>}
                        {stringStartDate && stringEndDate && 
                        `Du ${stringStartDate} au ${stringEndDate}`}
                    </ListItem>
                    <Divider component="li" />
                    <ListItem><HotelIcon />
                        {!hotelSelected && 
                        <>
                            <Typography>Hôtel</Typography>
                            <HelpOutlineIcon/>
                        </>}
                        {/* Si la durée du séjour n'est pas sélectionnée, on affiche juste "hôtel compris" */}
                        {hotelSelected && hotelSelected === "true" && "Hôtel compris" }

                        {/* Si la durée est sélectionnée, on affiche le nombre de nuits (1 jour de moins que la durée du séjour) */}
                        {/* La durée étant une string dans le form, on la transforme en nombre avec parseInt */}
                        {/* Pour l'affichage du "s" de nuit : si la durée du séjour est égale à 2 jours il n'y aura qu'une nuit, si supérieure à 2, il y aura plusieurs nuits. */}
                        {hotelSelected && hotelSelected === "true" && durationSelected && parseInt(durationSelected) >= 2 && ` pour ${durationSelected -1} ${parseInt(durationSelected) > 2 ? "nuits" : "nuit"}`}
                        {hotelSelected && hotelSelected === "false" && "Sans hôtel"}
                    </ListItem>
                    <Divider component="li" />
                    <ListItem><LocalActivityIcon />
                        {!durationSelected &&
                        <>
                            <Typography>Durée du séjour</Typography>
                            <HelpOutlineIcon/>
                        </>}
                        {durationSelected && `Parc ${durationSelected} ${parseInt(durationSelected) > 1 ? "jours" : "jour"}`}
                    </ListItem>
                    <Divider component="li" />
                    <ListItem><EmojiPeopleIcon />
                        Nombre de personnes: {nbPeopleSelected}
                    </ListItem>
                    <Divider component="li" />
                    <ListItem><EuroIcon />
                        Prix total: {totalPrice === 0 ? <HelpOutlineIcon/> : (totalPrice * nbPeopleSelected) + ' € TTC'}
                    </ListItem>
                    <p className="info">Le paiement s'effectuera sur place lors de votre arrivée.</p>
                </List>}          
            </Box>

            <Box sx={{mx: 'auto'}}>
                <Checkbox type="checkbox" name="cgv" id="cgv" onChange={handleCheckboxChange} />
                <label htmlFor="cgv">J'accepte les <a href="/cgv" target="_blank">conditions générales de vente</a>.</label>
            </Box>

            <Button sx={{ mx:'auto'}} onClick={handleReservation}>Confirmer la réservation</Button>
            </Box>
        </form>
    </main>
    )
}

export default Reservation;