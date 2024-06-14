import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../actions/authActions.js";
import { useState } from "react";
import { Box, InputBase, InputLabel, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import FormField from "../../components/FormField/index.jsx";
import { Alert } from "@mui/material";

const Inscription = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);
    const [errorMessage, setErrorMessage] = useState('');
    const [legalTermsChecked, setLegalTermsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setLegalTermsChecked(event.target.checked);
    }

    const handleRegistration = (event) => {
        if (!legalTermsChecked){
            event.preventDefault();
            alert("Veuillez accepter la politique de confidentialité des données personnelles pour confirmer votre inscription.");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());
        if (userData.password !== userData.passwordConfirm) {
            setErrorMessage("Les mots de passe ne correspondent pas");
            return;
        }
        setErrorMessage('');

        dispatch(register(userData))
            .then(() => {
                // Redirect after success login
                navigate('/profil');
            })
            .catch((error) => {
                console.error("Erreur lors de la connexion :", error);
                setErrorMessage(error.message);
            });
    };

    return (
    
        <main className="center">
            <Typography>
                Indiquez ci-dessous vos informations personnelles pour créer un compte.
            </Typography>

            <form method="post" onSubmit={handleSubmit} className="form">

                <Box 
                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '1rem', width: '100%'}}>

                    <Typography>
                        Tous les champs sont obligatoires.
                    </Typography>

                    {error && 
                    <Alert variant="filled" severity="error">
                        {errorMessage}
                    </Alert>}
                    {errorMessage && 
                    <Alert variant="filled" severity="error">
                        {errorMessage}
                    </Alert>}

                    <FormField
                        variant="filled" 
                        label="Adresse e-mail"
                        size="small" 
                        fullWidth 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Votre adresse e-mail" 
                        required
                    />

                    <Typography>
                        Le mot de passe doit contenir au moins 12 caractères dont 1 majuscule, 1 chiffre et 1 caractère spécial.
                    </Typography>

                   <FormField
                        variant="filled" 
                        label="Mot de passe"
                        size="small"
                        fullWidth  
                        type="password" 
                        name="password" 
                        id="password"
                        placeholder="Votre mot de passe" 
                        required
                    />

                    <FormField
                        variant="filled" 
                        label="Confirmer le mot de passe"
                        size="small"
                        fullWidth   
                        type="password" 
                        name="passwordConfirm" 
                        id="passwordConfirm" 
                        placeholder="Confirmez votre mot de passe"
                        required
                    />

                    <FormField
                        variant="filled" 
                        label="Nom"
                        size="small"
                        fullWidth   
                        type="text"  
                        name="lastname" 
                        id="lastname" 
                        placeholder="Votre nom" 
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
                        placeholder="Votre prénom" 
                        required 
                    />

                    <FormField
                        variant="filled" 
                        label="Adresse"
                        size="small"  
                        fullWidth 
                        type="text" 
                        name="address" 
                        id="address" 
                        placeholder="Votre adresse" 
                        required 
                    />

                    <FormField
                        variant="filled" 
                        label="Code postal"
                        size="small"  
                        fullWidth 
                        type="text" 
                        name="postalCode" 
                        id="postalCode" 
                        placeholder="Votre code postal" 
                        required 
                    />

                    <FormField
                        variant="filled" 
                        label="Ville"
                        size="small" 
                        fullWidth  
                        type="text" 
                        name="city" 
                        id="city" 
                        placeholder="La ville où vous habitez" 
                        required 
                    />

                    <FormField
                        variant="filled" 
                        label="Pays"
                        size="small"  
                        fullWidth 
                        type="text" 
                        name="country" 
                        id="country" 
                        placeholder="France"
                        required 
                    />
                    <Box sx={{color: "white"}}>
                        <InputBase type="checkbox" name="legalTerms" id="legalTerms" onChange={handleCheckboxChange} />
                        <InputLabel htmlFor="legalTerms" sx={{ color: "white"}}>J'accepte la <a href="/mentions-legales" target="_blank">politique de confidentialité des données personnelles
                            </a>.
                        </InputLabel>
                    </Box>
                    
                    <Button 
                        type="submit" 
                        variant="contained"
                        onClick={handleRegistration}>
                        S'inscrire
                    </Button>
                </Box>
            </form>

            <Button 
                sx={{ backgroundColor: 'white', color: red[900], border: red[900], "&:hover": { backgroundColor: red[600], color: 'white', border: red[900]} }}
                variant="outlined" 
                href="/connexion">
                Se connecter
            </Button>

        </main>

    )
}

export default Inscription;