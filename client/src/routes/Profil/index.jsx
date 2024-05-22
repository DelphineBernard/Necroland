import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import decodeJWT from '../../utils/jwtUtils.js';

const Profil = () => {

    const token = useSelector((state) => state.auth.token);
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        if (token) {
            const decoded = decodeJWT(token);
            if (decoded) {
                setDecodedToken(decoded);
            }
        }
    }, [token]);

    return(
        <>
            <section>
                <h2>Vos informations</h2>
                {decodedToken && (
                    <ul>
                        <li>Nom: {decodedToken.lastname}</li>
                        <li>Prénom: {decodedToken.userFirstname}</li>
                        <li>Adresse: {decodedToken.address}</li>
                        <li>CP: {decodedToken.postal_code}</li>
                        <li>Ville: {decodedToken.city}</li>
                        <li>Pays: {decodedToken.country}</li>
                        <li>Email: {decodedToken.email}</li>
                    </ul>
                )}
                <button>Modifier vos informations</button>
            </section>

            <section>
                <h2>Vos réservations</h2>
                <div>
                    <h3>En cours</h3>
                    <p>Vous pouvez annuler votre réservation jusqu'à 10 jours avant la date de début de votre séjour.</p>
                    <div>
                        <ul>
                            <li>N° de réservation: </li>
                            <li>Date de début: </li>
                            <li>Date de fin: </li>
                            <li>Nombre de personnes: </li>
                            <li>Hôtel: </li>
                            <li>Prix total: </li>
                            <li>Statut: </li>
                        </ul>
                    </div>
                    <div>
                        <button>Annuler la réservation</button>
                    </div>
                </div>
                <div>
                    <h3>Terminées</h3>
                </div>
            </section>
        </>
    )
}

export default Profil;