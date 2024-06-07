import { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context/index.jsx';
import API_URL from '../../../config.js';
import { Modal, Box, Typography, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditAttractionModal = ({ attractionId, isOpen, onRequestClose, initialValues, onClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(initialValues);
    const { categories } = useContext(Context);

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
            const response = await fetch(`${API_URL}/attraction/${attractionId}`, {
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
                    Modifier l'attraction
                </Typography>
                <form onSubmit={handleSubmit}>
                    {successMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity='success'>{successMessage}</Alert>}
                    {errorMessage && <Alert sx={{ my: '1rem' }} variant='filled' severity='error'>{errorMessage}</Alert>}
                    <Typography sx={{ color: 'gray', mb: 2 }}>Tous les champs sont obligatoires.</Typography>
                    <TextField
                        fullWidth
                        label="Nom"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        type="text"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        multiline
                        minRows={3}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth variant='filled'>
                        <InputLabel>Catégorie</InputLabel>
                        <Select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            required
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} sx={{ color: 'black' }} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Modifier l'attraction
                        </Button>
                    </Box>
                </form>
            </Box>

        </Modal>
    )
}

export default EditAttractionModal;