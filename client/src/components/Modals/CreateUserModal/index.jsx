import { useState } from 'react';
import API_URL from '../../../config.js';
import { Alert } from "@mui/material";
import { Modal, Box, Typography, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CreateUserModal = ({ isOpen, onRequestClose }) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/user`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
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
            <Box
                sx={{
                    width: '90%',
                    maxWidth: 400,
                    maxHeight: '85vh',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    overflow: 'auto',
                    '@media (min-width:600px)': {
                        width: 400,
                    }
                }}
            >
                <Typography sx={{ color: 'black' }} gutterBottom>
                    Ajouter un membre
                </Typography>
                <form onSubmit={handleSubmit}>
                    {successMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity="success">{successMessage}</Alert>}
                    {errorMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity="error">{errorMessage}</Alert>}
                    <Typography sx={{ color: 'gray', mb: 2 }}>Tous les champs sont obligatoires.</Typography>
                    <TextField sx={{ mb: 2 }} fullWidth label="Adresse e-mail" name="email" type="email" required />
                    <TextField sx={{ mb: 2 }} fullWidth label="Mot de passe" name="password" type="password" required />
                    <TextField sx={{ mb: 2 }} fullWidth label="Nom" name="lastname" required />
                    <TextField sx={{ mb: 2 }} fullWidth label="Prénom" name="firstname" required />
                    <TextField sx={{ mb: 2 }} fullWidth label="Adresse" name="address" required />
                    <TextField sx={{ mb: 2 }} fullWidth label="Code postal" name="postalCode" required />
                    <TextField sx={{ mb: 2 }} fullWidth label="Ville" name="city" required />
                    <TextField sx={{ mb: 2 }} fullWidth label="Pays" name="country" required />
                    <FormControl fullWidth variant='filled'>
                        <InputLabel>Rôle</InputLabel>
                        <Select name="role_id" required>
                            <MenuItem sx={{ color: 'black' }} value={1}>Membre</MenuItem>
                            <MenuItem sx={{ color: 'black' }} value={2}>Administrateur</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Ajouter le membre
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateUserModal;