import { useEffect, useState } from "react";
import API_URL from '../../../config.js';
import EditReservationModal from "../../Modals/EditReservationModal/index.jsx";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";

const ReservationItem = ({ element, onClose }) => {

    const [users, setUsers] = useState();
    const [status, setStatus] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/reservations/${element.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                console.error('Erreur lors de la suppression de la réservation:', errorMessage);
            }
            onClose();
        } catch (error) {
            console.error('Erreur lors de la suppression de la réservation:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchStatus = async () => {
        try {
            const response = await fetch(`${API_URL}/status`);
            const data = await response.json();
            setStatus(data.status);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchStatus();
    }, []);

    return (
        <>
            <Card sx={{ marginBottom: '2rem', width: '100%' }} component="article">
                <CardContent>
                    <Typography sx={{ color: 'black' }}>N° de réservation : {element.id}</Typography>
                    <Typography sx={{ color: 'black' }}>Date de début : {element.start_date}</Typography>
                    <Typography sx={{ color: 'black' }}>Date de fin : {element.end_date}</Typography>
                    <Typography sx={{ color: 'black' }}>Nombre de personnes : {element.nb_people}</Typography>
                    <Typography sx={{ color: 'black' }}>Hôtel compris : {element.hotel === 'true' ? "Oui" : "Non"}</Typography>
                    <Typography sx={{ color: 'black' }}>Prix total : {element.total_price}€</Typography>
                    <Typography sx={{ color: 'black' }}>
                        Réservation effectuée par :
                            <span sx={{ color: 'black' }}>{users && users.find(user => user.id === element.user_id).lastname}</span>
                            <span sx={{ color: 'black' }}>{users && users.find(user => user.id === element.user_id).firstname}</span>
                            <span sx={{ color: 'black' }}>{users && users.find(user => user.id === element.user_id).email}</span>
                    </Typography>
                    <Typography sx={{ color: 'black' }}>
                        Statut : { status && status.find(status => status.id === element.status_id).label }
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: '1rem', marginTop: '1rem', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Button onClick={openModal}>Modifier</Button>
                        <Button onClick={handleDelete}>Supprimer</Button>
                    </Box>
                </CardContent>
            </Card>
            <EditReservationModal reservationId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} onClose={onClose} />
        </>
    )
}

export default ReservationItem;