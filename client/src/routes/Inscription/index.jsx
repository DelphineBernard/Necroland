import { Link } from "react-router-dom";

const Inscription = () => {

    return (
    
        <main>
            <p>Indiquez ci-dessous vos informations personnelles pour créer un compte.</p>
            <form method="post">
                <p>* Champs obligatoires</p>
                {typeof alert !== 'undefined' && <p className="message message--error">{alert}</p>}
                <div>
                    <label htmlFor="email">Adresse e-mail *</label>
                    <input type="email" name="email" id="email" placeholder="Votre adresse e-mail" />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe *</label>
                    <p>Le mot de passe doit contenir au moins 12 caractères dont 1 majuscule, 1 chiffre et 1 caractère spécial.</p>
                    <input type="password" name="password" id="password" placeholder="Votre mot de passe" />
                </div>
                <div>
                    <label htmlFor="passwordConfirm">Confirmation mot de passe *</label>
                    <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmez votre mot de passe" />
                </div>
                <div>
                    <label htmlFor="lastname">Nom *</label>
                    <input type="text" name="lastname" id="lastname" placeholder="Votre nom" />
                </div>
                <div>
                    <label htmlFor="firstname">Prénom *</label>
                    <input type="text" name="firstname" id="firstname" placeholder="Votre prénom" />
                </div>
                <div>
                    <label htmlFor="address">Adresse *</label>
                    <input type="text" name="address" id="address" placeholder="Votre adresse" />
                </div>
                <div>
                    <label htmlFor="postalCode">Code postal *</label>
                    <input type="text" name="postalCode" id="postalCode" placeholder="Votre code postal" />
                </div>
                <div>
                    <label htmlFor="city">Ville *</label>
                    <input type="text" name="city" id="city" placeholder="La ville où vous habitez" />
                </div>
                <div>
                    <label htmlFor="country">Pays *</label>
                    <input type="text" name="country" id="country" placeholder="France"/>
                </div>
                <button type="submit">S'inscrire</button>
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