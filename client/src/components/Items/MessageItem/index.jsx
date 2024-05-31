import { useEffect, useState } from "react";
import API_URL from '../../../config.js';

const MessageItem = ({ element, onClose }) => {

    const [status, setStatus] = useState([]);

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
        fetchStatus();
    }, []);

    const updateMessageStatus = async (messageId) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/message/${messageId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status_id: 4 }),
            });
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const currentStatus = status.find(status => status.id === element.status_id);

    return (
        <article style={{ marginBottom: '2rem' }}>
            <div>
                <p>Nom : {element.lastname}</p>
                <p>Prénom : {element.firstname}</p>
                <p>Email : {element.email}</p>
                <p>Objet : {element.object}</p>
                <p>Contenu : {element.content}</p>
                <p>Statut : {currentStatus ? currentStatus.label : 'Loading...'}</p>
            </div>
            <div>
                {currentStatus && currentStatus.label !== 'Traité' && (
                    <button onClick={() => updateMessageStatus(element.id)}>Marquer comme classé</button>
                )}
            </div>
        </article>
    )
}

export default MessageItem;