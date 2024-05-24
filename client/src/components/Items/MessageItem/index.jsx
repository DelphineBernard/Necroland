import { useEffect, useState } from "react";

const MessageItem = ({ element }) => {

    const [status, setStatus] = useState();

    const fetchStatus = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/status");
            const data = await response.json();
            setStatus(data.status);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    return (
        <article style={{ marginBottom: '2rem' }}>
            <div>
                <p>Nom : {element.lastname}</p>
                <p>Prénom : {element.firstname}</p>
                <p>Email : {element.email}</p>
                <p>Objet : {element.object}</p>
                <p>Contenu : {element.content}</p>
                <p>Statut : {
                    status && status.find(status => status.id === element.status_id).label
                }</p>
            </div>
            <div>
                <button>Marquer comme classé</button>
            </div>
        </article>
    )
}

export default MessageItem;