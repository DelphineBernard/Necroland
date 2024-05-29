import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions.js";

const Connexion = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());
        dispatch(login(userData));
        navigate('/profil');
    };

    return (

        <main>
            <p>Saisissez ci-dessous vos identifiants de connexion.</p>
            <form method="post" onSubmit={handleSubmit}>
                <p>* Champs obligatoires</p>
                {error && <p className="message message--error">{error}</p>}
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
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Votre mot de passe"
                        required
                    />
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