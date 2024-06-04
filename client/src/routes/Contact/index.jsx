import { useState } from "react";
import API_URL from '../../config.js';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import FormField from "../../components/FormField/index.jsx";
import { Box, Alert } from "@mui/material";

const Contact = () => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const messageData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_URL}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
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
    }

    return (
        <main className="center">
            <p>Vous pouvez nous contacter pour toute demande d'information concernant le parc ou votre séjour.</p>
            <form method="post" onSubmit={handleSubmit} className="form">
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '1rem', width: '100%'}}>
                {successMessage && <Alert variant="filled" severity="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="filled" severity="error">{errorMessage}</Alert>}
                <p>Tous les champs ci-dessous sont obligatoires.</p>

                    {/* <label htmlFor="lastname">Nom</label> */}
                    <FormField
                        variant="filled" 
                        label="Nom"
                        size="small"
                        fullWidth
                        type="text" 
                        name="lastname" 
                        id="lastname"
                        required
                    />

                    {/* <label htmlFor="firstname">Prénom</label> */}
                    <FormField
                        variant="filled"
                        label="Prénom"
                        size="small"
                        fullWidth
                        type="text" 
                        name="firstname" 
                        id="firstname"
                        required
                    />

                    {/* <label htmlFor="email">Email</label> */}
                    <FormField
                        variant="filled"
                        label="E-mail"
                        size="small"
                        fullWidth
                        type="email" 
                        name="email" 
                        id="email"
                        required
                    />

                    {/* <label htmlFor="object">Objet</label> */}
                    <FormField
                        variant="filled"
                        label="Objet"
                        size="small"
                        fullWidth
                        type="text" 
                        name="object" 
                        id="object"
                        required
                    />

                    {/* <label htmlFor="content">Description</label> */}
                    <FormField
                        variant="filled"
                        multiline
                        rows={4}
                        label="Description"
                        size="small"
                        fullWidth
                        name="content" 
                        id="content"
                        required
                    />

                <Button 
                    type="submit" 
                    variant="contained">
                    Envoyer
                </Button>   
              </Box>                  
            </form>
        </main>
    )
}

export default Contact;