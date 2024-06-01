import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ReservationInfos from '../../components/ReservationInfos/index.jsx';
import EditUserModal from '../../components/Modals/EditUserModal/index.jsx';
import API_URL from '../../config.js';
import { Box, Button, Card, CardActions, CardContent, List, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const Profil = () => {

    // Je récupère mon token stocké dans le store
    const userId = useSelector((state) => state.auth.userId);
    const [userReservations, setUserReservations] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentReservations, setCurrentReservations] = useState([]);
    const [passedReservations, setPassedReservations] = useState([]);
    const [userInfos, setUserInfos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchUserInfos = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
                
            }
            const data = await response.json();
            setUserInfos(data.user);
            setDataLoaded(true);
        } catch (error) {
            console.error('Error fetching user informations:', error);
        }
    };

    const fetchUserReservations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/reservations/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const sortedData = data.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
            setUserReservations(sortedData);
            setDataLoaded(true);

            const current = data.filter(reservation => reservation.reservationStatus.label === "Confirmée" && new Date(reservation.end_date) >= Date.now());
            const passed = data.filter(reservation => reservation.reservationStatus.label === "Annulée" || new Date(reservation.end_date) < Date.now());

            setCurrentReservations(current);
            setPassedReservations(passed);

        } catch (error) {
            console.error('Error fetching reservations:', error);
        }

    };

    useEffect(() => {
        fetchUserInfos();
        fetchUserReservations();
    }, []);

    // cancel reservation on click of button "Annuler la réservation"
    const handleCancel = async (reservationId) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/reservation/${reservationId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status_id: 2 }), // Update status to "Annulée" (id 2)
            });
            fetchUserReservations();
        } catch (error) {
            console.error("Erreur lors de l'annulation de la réservation:", error);
        }
    };

    return (
        <main className='center'>
                
                <Box component='section'>
                    <Typography variant='h2'>Vos informations</Typography>
                    {dataLoaded &&
                    <Card sx= {{ display: 'flex', flexDirection: "column", backgroundColor: 'black', p:2}}>
                        <List >
                            <li>Nom: {userInfos.lastname}</li>
                            <li>Prénom: {userInfos.firstname}</li>
                            <li>Adresse: {userInfos.address}</li>
                            <li>CP: {userInfos.postal_code}</li>
                            <li>Ville: {userInfos.city}</li>
                            <li>Pays: {userInfos.country}</li>
                            <li>Email: {userInfos.email}</li>
                        </List>
                        <Button size="small" onClick={openModal}>Modifier vos informations</Button>
                    </Card>}
                </Box>

            <section>
                <Typography variant='h2'>Vos réservations</Typography>
                <div>
                    <Typography variant='h3'>En cours</Typography>
                    
                    <Box sx={{ display: 'flex',  border: '1px solid white', borderRadius: '0.5rem', p: "0.5rem", m:"1rem" }}>
                        
                        <Typography><InfoOutlinedIcon />Vous pouvez annuler votre réservation jusqu'à 10 jours avant la date de début de votre séjour.</Typography>
                    </Box>
                    
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
                                status={reservation.reservationStatus.label}
                                handleCancel={handleCancel} />
                        ))}
                    </div>
                </div>
                <div>
                    <Typography variant='h3'>Terminées</Typography>
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
                            status={reservation.reservationStatus.label}
                            handleCancel={handleCancel} />
                    ))}
                </div>
            </section>
            <EditUserModal userId={userInfos.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={userInfos} />
        </main>
    )
}

export default Profil;