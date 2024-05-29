import { useEffect, useState } from "react";
import API_URL from '../../../config.js';

const ReservationItem = ({ element }) => {

    const [users, setUsers] = useState();
    const [status, setStatus] = useState();

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/users`);
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
        <article style={{ marginBottom: '2rem' }}>
            <div>
                <p>Date de début : {element.start_date}</p>
                <p>Date de fin : {element.end_date}</p>
                <p>Nombre de personnes : {element.nb_people}</p>
                <p>Hôtel compris : {element.hotel ? "Oui" : "Non"}</p>
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
                <button>Modifier</button>
                <button>Supprimer</button>
            </div>
        </article>
    )

}

export default ReservationItem;