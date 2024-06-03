import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ReservationInfos from '../../components/ReservationInfos/index.jsx';
import EditUserModal from '../../components/Modals/EditUserModal/index.jsx';
import API_URL from '../../config.js';
import { Box, Button, Card, List, ListItem, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
        <main className="center">
                
            <Box component="section">
                <Typography variant="h2">Vos informations</Typography>
                {dataLoaded &&
                <Card sx= {{ display: { xs: "block", sm: "flex"},
                    alignItems: "center", backgroundColor: "#00000070", p:2, borderRadius: "0.5rem", p:"1rem", m:"1rem"}}>
                    <List sx={{display: "flex", flexDirection: "column", p:2}}>
                        <ListItem><Typography variant="span">Nom:</Typography> {userInfos.lastname}</ListItem>
                        <ListItem><Typography variant="span">Prénom: </Typography>{userInfos.firstname}</ListItem>
                        <ListItem><Typography variant="span">Email:</Typography> {userInfos.email}</ListItem>
                        <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}><Typography variant="span">Adresse:</Typography>
                        <Typography>{userInfos.address}</Typography> 
                        <Typography>{userInfos.postal_code} {userInfos.city} {userInfos.country}</Typography> </ListItem>
                    </List>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "1rem"}}>
                        <Button size="small" onClick={openModal}>Modifier mes informations</Button>
                        <Button size="small" onClick={() => handleDeleteAccount(userInfos.id)}>Supprimer mon compte</Button>
                    </Box>
                </Card>}
            </Box>

            <Box component="section">
                <Typography variant="h2">Vos réservations</Typography>
                <Box component="article">
                    <Typography variant="h3">En cours</Typography>
                    
                    <Box sx={{ display: "flex",  border: "1px solid white", borderRadius: "0.5rem", p: "0.5rem", m:"1rem" }}>
                        
                        <Typography sx={{display: "flex", alignItems: "center", columnGap: "1rem"}}><InfoOutlinedIcon />Vous pouvez annuler votre réservation jusqu'à 10 jours avant la date de début de votre séjour.</Typography>
                    </Box>
                    
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        {dataLoaded && currentReservations.length === 0 &&
                            <Typography>Vous n'avez aucune réservation en cours.</Typography>}
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
                    </Box>
                </Box>
                <Box component="article">
                    <Typography variant='h3'>Terminées</Typography>
                    {dataLoaded && passedReservations.length === 0 &&
                        <Typography>Vous n'avez aucune réservation archivée.</Typography>}
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
                </Box>
            </Box>
            <EditUserModal userId={userInfos.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={userInfos} />
        </main>
    )
}

export default Profil;