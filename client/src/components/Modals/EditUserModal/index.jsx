import { useState, useEffect } from 'react';
import API_URL from '../../../config.js';
import { Modal, Box, Typography, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditUserModal = ({ userId, isOpen, onRequestClose, initialValues, onClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(initialValues);

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);

    const fieldMapping = {
        email: 'email',
        password: 'password',
        lastname: 'lastname',
        firstname: 'firstname',
        address: 'address',
        postalCode: 'postal_code',
        city: 'city',
        country: 'country',
        role_id: 'role_id',
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const mappedName = fieldMapping[name];
        // We map to convert the form field names to corresponding property names in the formData object
        setFormData({ ...formData, [mappedName]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log("Formdata", formData)

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
                    Modifier le membre
                </Typography>
                <form onSubmit={handleSubmit}>
                    {successMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity='success'>{successMessage}</Alert>}
                    {errorMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity='error'>{errorMessage}</Alert>}
                    <Typography sx={{ color: 'gray', mb: 2 }}>Tous les champs sont obligatoires.</Typography>
                    <TextField
                        fullWidth
                        label="Adresse e-mail"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <Typography sx={{ mb: '1rem', color: 'black' }}>Le mot de passe doit contenir au moins 12 caractères dont 1 majuscule, 1 chiffre et 1 caractère spécial.</Typography>
                    <TextField
                        fullWidth
                        label="Mot de passe"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Nom"
                        name="lastname"
                        type="text"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Prénom"
                        name="firstname"
                        type="text"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Adresse"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Code postal"
                        name="postalCode"
                        type="text"
                        value={formData.postal_code}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Ville"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Pays"
                        name="country"
                        type="text"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth variant='filled'>
                        <InputLabel>Rôle</InputLabel>
                        <Select
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem sx={{ color: 'black' }} value="1">Membre</MenuItem>
                            <MenuItem sx={{ color: 'black' }} value="2">Administrateur</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Modifier le membre
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}

export default EditUserModal;