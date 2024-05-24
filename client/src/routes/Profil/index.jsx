import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import decodeJWT from '../../utils/jwtUtils.js';
import ReservationInfos from '../../components/ReservationInfos/index.jsx';

const Profil = () => {

    // Je récupère mon token stocké dans le store
    const token = useSelector((state) => state.auth.token);
    const [decodedToken, setDecodedToken] = useState(null);
    const [userReservations, setUserReservations] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentReservations, setCurrentReservations] = useState([]);
    const [passedReservations, setPassedReservations] = useState([]);

    // A chaque fois que mon token change, je recharge le composant et décode le token, je stocke mon token décodé dans un state
    useEffect(() => {
        if (token) {
            const decoded = decodeJWT(token);
            if (decoded) {
                setDecodedToken(decoded);
            }
        }
    }, [token]);

    useEffect(() => {
        const fetchUserReservations = async () => {
            if (decodedToken){
                try {
                    const response = await fetch(`http://localhost:3000/api/reservations/${decodedToken.userId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setUserReservations(data);
                    setDataLoaded(true);

                    const current = data.filter(reservation => reservation.reservationStatus.label === "Confirmée");
                    const passed = data.filter(reservation => reservation.reservationStatus.label === "Annulée");
                    setCurrentReservations(current);
                    setPassedReservations(passed);

                } catch (error) {
                    console.error('Error fetching reservations:', error);
                }
            }
        };
        fetchUserReservations();
    }, [decodedToken]);

    return(
        <main>
            <section>
                <h2>Vos informations</h2>
                {/* Je peux accéder à toutes les propriétés de mon token décodé */}
                {decodedToken && (
                    <ul>
                        <li>Nom: {decodedToken.userLastname}</li>
                        <li>Prénom: {decodedToken.userFirstname}</li>
                        <li>Adresse: {decodedToken.userAddress}</li>
                        <li>CP: {decodedToken.userPostalCode}</li>
                        <li>Ville: {decodedToken.userCity}</li>
                        <li>Pays: {decodedToken.userCountry}</li>
                        <li>Email: {decodedToken.userEmail}</li>
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
                    {dataLoaded && currentReservations.length === 0 && 
                        <p>Vous n'avez aucune réservation en cours.</p>}
                    {dataLoaded && currentReservations.map(reservation => (
                        <ReservationInfos
                        key={reservation.id}
                        id={reservation.id}
                        start_date={reservation.start_date}
                        end_date={reservation.end_date}
                        nb_people={reservation.nb_people}
                        hotel={reservation.hotel}
                        total_price={reservation.total_price}
                        status={reservation.reservationStatus.label} />
                        ))}
                    </div>
                </div>
                <div>
                    <h3>Terminées</h3>
                    {dataLoaded && passedReservations.length === 0 && 
                        <p>Vous n'avez aucune réservation archivée.</p>}
                    {dataLoaded && passedReservations.map(reservation => (
                        <ReservationInfos
                        key={reservation.id}
                        id={reservation.id}
                        start_date={reservation.start_date}
                        end_date={reservation.end_date}
                        nb_people={reservation.nb_people}
                        hotel={reservation.hotel}
                        total_price={reservation.total_price}
                        status={reservation.reservationStatus.label} />
                        ))}
                </div>
            </section>
        </main>
    )
}

export default Profil;