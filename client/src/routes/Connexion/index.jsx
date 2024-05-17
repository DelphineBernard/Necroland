import { Link } from "react-router-dom";

const Connexion = () => {

    return (

        <main>
            <p>Saisissez ci-dessous vos identifiants de connexion.</p>
            <form method="post">
                <p>* Champs obligatoires</p>
                {typeof alert !== 'undefined' && <p className="message message--error">{alert}</p>}
                <div>
                    <label htmlFor="email">Adresse e-mail *</label>
                    <input type="email" name="email" id="email" placeholder="Votre adresse e-mail" />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe *</label>
                    <input type="password" name="password" id="password" placeholder="Votre mot de passe"/>
                    <a href="#">Mot de passe oublié ?</a>
                </div>
                <button type="submit">Se connecter</button>
            </form>
            <div>
                <div></div>
                <p>ou</p>
                <div></div>
            </div>
            <Link to={"/inscription"}>S'inscrire</Link>
        </main>
    )
}

export default Connexion;