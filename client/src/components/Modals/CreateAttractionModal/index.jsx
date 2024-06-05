import { useState, useContext } from 'react';
import { Context } from '../../Context';
import API_URL from '../../../config.js';
import { Alert } from "@mui/material";
import { Modal, Box, Typography, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CreateAttractionModal = ({ isOpen, onRequestClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { categories } = useContext(Context);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const attractionData = Object.fromEntries(formData.entries());

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/attraction`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(attractionData)
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage(result.message);
                setErrorMessage('');
            } else {
                setSuccessMessage('');
                setErrorMessage(result.message);
            }

        } catch (error) {
            console.error('Erreur:', error);
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
                    Ajouter une attraction
                </Typography>
                <form onSubmit={handleSubmit}>
                    {successMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity='success'>{successMessage}</Alert>}
                    {errorMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity='error'>{errorMessage}</Alert>}
                    <Typography sx={{ color: 'gray', mb: 2 }}>Tous les champs sont obligatoires.</Typography>
                    <TextField sx={{ mb: 2 }} fullWidth label="Nom" name="name" required />
                    <TextField sx={{ mb: 2 }} fullWidth label="Description" name="description" required />
                    <FormControl fullWidth variant='filled'>
                        <InputLabel>Catégorie</InputLabel>
                        <Select
                            name="category_id"
                            required
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} sx={{ color: 'black' }} value={category.id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Ajouter l'attraction
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default CreateAttractionModal;