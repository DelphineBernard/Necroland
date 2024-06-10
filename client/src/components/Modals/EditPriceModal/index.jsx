import { useState, useEffect } from 'react';
import API_URL from '../../../config.js';
import { Modal, Box, Typography, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditPriceModal = ({ priceId, isOpen, onRequestClose, initialValues, onClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(initialValues);

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/price/${priceId}`, {
                method: 'PUT',
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
                    Modifier un prix
                </Typography>
                <form onSubmit={handleSubmit}>
                    {successMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity='success'>{successMessage}</Alert>}
                    {errorMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity='error'>{errorMessage}</Alert>}
                    <Typography sx={{ color: 'gray', mb: 2 }}>Tous les champs sont obligatoires.</Typography>
                    <TextField
                        sx={{ mb: 2 }}
                        fullWidth
                        label="Durée (en jours)"
                        name="duration"
                        type='number'
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        sx={{ mb: 2 }}
                        fullWidth
                        label="Montant (au format XX.XX)"
                        name="price"
                        type='text'
                        pattern="\d+(\.\d{2})?"
                        title="Le montant doit être au format XX.XX"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                    <FormControl fullWidth variant='filled'>
                        <InputLabel>Hôtel inclus ?</InputLabel>
                        <Select
                            name="hotel"
                            required
                            onChange={handleChange} 
                            value={formData.hotel}
                        >
                            <MenuItem sx={{ color: 'black' }} value="true">Oui</MenuItem>
                            <MenuItem sx={{ color: 'black' }} value="false">Non</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Modifier le prix
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default EditPriceModal;