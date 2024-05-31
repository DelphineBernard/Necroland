import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions.js";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import FormField from "../../components/FormField/index.jsx";

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
                // Redirection après une connexion réussie
                navigate('/profil');
            })
            .catch((error) => {
                console.error("Erreur lors de la connexion :", error);
            });
    };

    return (

        <main>
            <p>Saisissez ci-dessous vos identifiants de connexion.</p>
            <form method="post" onSubmit={handleSubmit} className="form">
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '1rem', width: '100%'}}>
                <p>Tous les champs sont obligatoires.</p>
                {error && <p className="message message--error">{error}</p>}
                    {/* <label htmlFor="email">Adresse e-mail *</label> */}
                    <Box sx={{ my: 1, display: 'flex', alignItems: 'center', width: '100%' }}>
                        <AccountCircle sx={{ color: 'action.active', fontSize: 45, mr: 1, my: 0.5 }} />
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
                    {/* <label htmlFor="password">Mot de passe *</label> */}
                    <Box sx={{ my: 1, display: 'flex', alignItems: 'center', width: '100%' }}>
                        <LockIcon sx={{ color: 'action.active', fontSize: 45, mr: 1, my: 0.5 }} />
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
            <div>
                <div></div>
                <p>ou</p>
                <div></div>
            </div>
            <Button 
                sx={{ backgroundColor: 'white', color: red[900], border: red[900], "&:hover": { backgroundColor: red[600], color: 'white', border: red[900]} }}
                variant="outlined" 
                href="/inscription">
                S'inscrire
            </Button>
        </main>
    )
}

export default Connexion;