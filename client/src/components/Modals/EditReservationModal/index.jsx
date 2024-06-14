import { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context/index.jsx';
import formatDate from '../../../utils/dateUtils.js';
import API_URL from '../../../config.js';
import { Modal, Box, Typography, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditReservationModal = ({ reservationId, isOpen, onRequestClose, initialValues, onClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(initialValues);
    const [totalPrice, setTotalPrice] = useState(initialValues.total_price);
    const [duration, setDuration] = useState(1);
    const [hotelSelected, setHotelSelected] = useState(initialValues.hotel);
    const [durationSelected, setDurationSelected] = useState(duration);
    const [nbPeopleSelected, setNbPeopleSelected] = useState(initialValues.nb_people);
    const [startDate, setStartDate] = useState(initialValues.start_date);
    const [endDate, setEndDate] = useState(initialValues.end_date);
    const { allPrices } = useContext(Context);

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end - start + 1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDuration(diffDays);
        return diffDays;
    };

    const calculeTotalPrice = () => {
        try {
            const selectedPrice = allPrices.find(price => price.duration == durationSelected && String(price.hotel) === hotelSelected);
            if (selectedPrice) {
                setTotalPrice(selectedPrice.price * nbPeopleSelected);
            }
        } catch (error) {
            console.error("Erreur le prix n'a pas pu être calculé", error);
        }
    };

    const updateEndDate = () => {
        const fullStartDate = new Date(startDate);
        const fullEndDate = new Date(startDate);
        fullEndDate.setDate(fullStartDate.getDate() + parseInt(durationSelected) - 1);

        const shortOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formEndDate = formatDate(fullEndDate, shortOptions).split('/').reverse().join('-');
        setEndDate(formEndDate);
        setFormData({ ...formData, end_date: formEndDate });
    };

    const handleHotelChange = (event) => {
        const value = event.target.value;
        if (durationSelected < 2) {
            // Empêche de choisir avec hôtel si la durée du séjour sélectionnée est de 1 jour
            return;
        }
        setHotelSelected(value);
        setFormData({ ...formData, hotel: value });
    };

    const handleDurationChange = (event) => {
        const value = event.target.value;
        setDurationSelected(value);
        setDuration(parseInt(value));
        setFormData({ ...formData, duration: parseInt(value) });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'nb_people') {
            setNbPeopleSelected(parseInt(value));
        } else if (name === 'start_date') {
            setStartDate(value);
        }
    };

    useEffect(() => {
        setFormData(initialValues);
        const initialDuration = calculateDuration(initialValues.start_date, initialValues.end_date);
        setDuration(initialDuration);
        setDurationSelected(initialDuration);
        setNbPeopleSelected(initialValues.nb_people);
        calculeTotalPrice();
    }, [initialValues]);

    useEffect(() => {
        if (hotelSelected === "true" && durationSelected === "1") {
            setDurationSelected("2");
        }
        calculeTotalPrice();
    }, [hotelSelected]);

    useEffect(() => {
        calculeTotalPrice();
        if (startDate && durationSelected) {
            updateEndDate();
        }
    }, [durationSelected, startDate, nbPeopleSelected]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage(result.message);
                setErrorMessage('');
                onClose();
            } else {
                setSuccessMessage('');
                setErrorMessage(result.message);
            }

        } catch (error) {
            console.error('Erreur:', error);
            console.log(formData)
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Box sx={{ width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography sx={{ color: 'black' }} gutterBottom>
                    Modifier une réservation
                </Typography>
                <form method="post" onSubmit={handleSubmit}>
                    {successMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity='success'>{successMessage}</Alert>}
                    {errorMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity='error'>{errorMessage}</Alert>}
                    <Typography sx={{ color: 'gray', mb: 2 }}>Tous les champs sont obligatoires.</Typography>
                    <FormControl fullWidth required variant='filled'>
                        <InputLabel>Durée du séjour</InputLabel>
                        <Select
                            name="duration"
                            value={durationSelected}
                            onChange={handleDurationChange}
                            sx={{ mb: 2 }}
                        >
                            {hotelSelected !== "true" && <MenuItem sx={{ color: 'black' }} value="1">1 jour</MenuItem>}
                            <MenuItem sx={{ color: 'black' }} value="2">2 jours</MenuItem>
                            <MenuItem sx={{ color: 'black' }} value="3">3 jours</MenuItem>
                            <MenuItem sx={{ color: 'black' }} value="4">4 jours</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth required variant='filled'>
                        <InputLabel>Hôtel</InputLabel>
                        <Select
                            name="hotel"
                            value={hotelSelected}
                            onChange={handleHotelChange}
                            sx={{ mb: 2 }}
                        >
                            {durationSelected !== "1" && <MenuItem sx={{ color: 'black' }} value="true">Avec hôtel</MenuItem>}
                            <MenuItem sx={{ color: 'black' }} value="false">Sans hôtel</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Nombre de personnes"
                        name="nb_people"
                        type="number"
                        value={nbPeopleSelected}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Date de début"
                        name="start_date"
                        type="date"
                        value={startDate}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Date de fin"
                        name="end_date"
                        type="date"
                        value={endDate}
                        readOnly
                        sx={{ mb: 2 }}
                    />
                    <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Prix total : {totalPrice} € TTC</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Modifier la réservation
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default EditReservationModal;