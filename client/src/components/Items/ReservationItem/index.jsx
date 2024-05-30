import { useEffect, useState } from "react";
import API_URL from '../../../config.js';
import EditReservationModal from "../../Modals/EditReservationModal/index.jsx";

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
            const response = await fetch(`${API_URL}/reservation/delete/${element.id}`, {
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
            <article style={{ marginBottom: '2rem' }}>
                <div>
                    <p>N° de réservation : {element.id}</p>
                    <p>Date de début : {element.start_date}</p>
                    <p>Date de fin : {element.end_date}</p>
                    <p>Nombre de personnes : {element.nb_people}</p>
                    <p>Hôtel compris : {element.hotel === 'true' ? "Oui" : "Non"}</p>
                    <p>Prix total : {element.total_price}€</p>
                    <p>Réservation effectuée par :
                        <span>{users && users.find(user => user.id === element.user_id).lastname}</span>
                        <span>{users && users.find(user => user.id === element.user_id).firstname}</span>
                        <span>{users && users.find(user => user.id === element.user_id).email}</span>
                    </p>
                    <p>Statut : {
                        status && status.find(status => status.id === element.status_id).label
                    }</p>
                </div>
                <div>
                    <button onClick={openModal}>Modifier</button>
                    <button onClick={handleDelete}>Supprimer</button>
                </div>
            </article>
            <EditReservationModal reservationId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} onClose={onClose} />
        </>
    )
}

export default ReservationItem;