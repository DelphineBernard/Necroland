import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../actions/authActions.js";
import { useState } from "react";

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
                // Redirection après une inscription réussie
                navigate('/profil');
            })
            .catch((error) => {
                console.error("Erreur lors de la connexion :", error);
            });
    };

    return (
    
        <main>
            <p>Indiquez ci-dessous vos informations personnelles pour créer un compte.</p>
            <form method="post" onSubmit={handleSubmit}>
                <p>* Champs obligatoires</p>
                {error && <p className="message message--error">{error}</p>}
                {errorMessage && <p className="message message--error">{errorMessage}</p>}
                <div>
                    <label htmlFor="email">Adresse e-mail *</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Votre adresse e-mail" 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe *</label>
                    <p>Le mot de passe doit contenir au moins 12 caractères dont 1 majuscule, 1 chiffre et 1 caractère spécial.</p>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Votre mot de passe" 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirm">Confirmation mot de passe *</label>
                    <input 
                        type="password" 
                        name="passwordConfirm" 
                        id="passwordConfirm" 
                        placeholder="Confirmez votre mot de passe"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Nom *</label>
                    <input 
                        type="text" 
                        name="lastname" 
                        id="lastname" 
                        placeholder="Votre nom" 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstname">Prénom *</label>
                    <input 
                        type="text" 
                        name="firstname" 
                        id="firstname" 
                        placeholder="Votre prénom" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="address">Adresse *</label>
                    <input 
                        type="text" 
                        name="address" 
                        id="address" 
                        placeholder="Votre adresse" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">Code postal *</label>
                    <input 
                        type="text" 
                        name="postalCode" 
                        id="postalCode" 
                        placeholder="Votre code postal" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="city">Ville *</label>
                    <input 
                        type="text" 
                        name="city" 
                        id="city" 
                        placeholder="La ville où vous habitez" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="country">Pays *</label>
                    <input 
                        type="text" 
                        name="country" 
                        id="country" 
                        placeholder="France"
                        required 
                    />
                </div>
                <div>
                    <input type="checkbox" name="legalTerms" id="legalTerms" onChange={handleCheckboxChange} />
                    <label htmlFor="legalTerms">J'accepte la <a href="/mentions-legales" target="_blank">politique de confidentialité des données personnelles</a>.</label>
                </div>
                <button type="submit" onClick={handleRegistration}>S'inscrire</button>
            </form>
            <div>
                <div></div>
                <p>ou</p>
                <div></div>
            </div>
            <Link to={"/connexion"}>Se connecter</Link>
        </main>

    )
}

export default Inscription;