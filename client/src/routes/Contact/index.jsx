import { useState } from "react";
import API_URL from '../../config.js';
import Button from '@mui/material/Button';
import FormField from "../../components/FormField/index.jsx";
import { Box, Alert, Typography, FormControl, InputLabel } from "@mui/material";

const Contact = () => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const messageData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_URL}/messages`, {
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
            <Typography>
                Vous pouvez nous contacter pour toute demande d'information concernant le parc ou votre séjour.
            </Typography>
            
            <form method="post" onSubmit={handleSubmit} className="form">
                <Box 
                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '1rem', width: '100%'}}>

                {successMessage && 
                <Alert variant="filled" severity="success">
                    {successMessage}
                </Alert>}

                {errorMessage &&
                <Alert variant="filled" severity="error">
                    {errorMessage}
                </Alert>}

                <Typography>
                    Tous les champs ci-dessous sont obligatoires.
                </Typography>

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

                <FormControl>
                    <InputLabel htmlFor="content" sx={{display:"none"}} >Description</InputLabel>
                    <textarea
                    name="content"
                    id="content"
                    placeholder="Description*"
                    minRows={4}
                    aria-label="Description"
                    required
                    />
                </FormControl>

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