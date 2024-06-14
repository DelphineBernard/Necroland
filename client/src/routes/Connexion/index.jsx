import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions.js";
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import FormField from "../../components/FormField/index.jsx";
import { Alert, Typography } from "@mui/material";

const Connexion = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());

        dispatch(login(userData))
            .then(() => {
                // Redirect after success login 
                navigate('/profil');
            })
            .catch((error) => {
                console.error("Erreur lors de la connexion :", error);
            });
    };

    return (

        <main className="center">
            <Typography>
                Saisissez ci-dessous vos identifiants de connexion.
            </Typography>

            <form method="post" onSubmit={handleSubmit} className="form">
                <Box 
                    sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '1rem', width: '100%'}}>
                    <Typography>
                        Tous les champs sont obligatoires.
                    </Typography>

                    {error && 
                    <Alert 
                        variant="filled" 
                        severity="error" >
                        {error}
                    </Alert>}

                    <Box 
                        sx={{ my: 1, display: 'flex', alignItems: 'center', width: '100%' }}>
                        <AccountCircle sx={{ color: "white", fontSize: 45, mr: 1, my: 0.5 }} />
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
                    </Box>

                    <Box sx={{ my: 1, display: 'flex', alignItems: 'center', width: '100%' }}>
                        <LockIcon sx={{ color: "white", fontSize: 45, mr: 1, my: 0.5 }} />
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
                    </Box>

                    <Button 
                        type="submit" 
                        variant="contained">
                        Se connecter
                    </Button>
                </Box>
            </form>

            <Button 
                sx={{ backgroundColor: 'white', color: red[900], border: red[900], "&:hover": { backgroundColor: red[600], color: 'white', border: red[900]} }}
                variant="outlined" 
                href="/inscription">
                S'inscrire
            </Button>
        </main>
    );
};

export default Connexion;