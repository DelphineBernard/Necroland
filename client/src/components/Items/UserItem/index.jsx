import { useState } from "react";
import EditUserModal from "../../Modals/EditUserModal";
import API_URL from "../../../config";

const UserItem = ({ element, onClose }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleteUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/user/${element.id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                const errorMessage = await response.json();
                console.error('Erreur lors de la suppression de l\'utilisateur:', errorMessage);
            }
            onClose();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
    }

    return (
        <>
            <article style={{ marginBottom: '2rem' }}>
                <div>
                    <p>Nom : {element.firstname}</p>
                    <p>Prénom : {element.lastname}</p>
                    <p>Email : {element.email}</p>
                    <p>Adresse : {element.address}</p>
                    <p>Code postal : {element.postal_code}</p>
                    <p>Ville : {element.city}</p>
                    <p>Pays : {element.country}</p>
                    <p>Rôle : {element.role_id === 1 ? "Membre" : "Administrateur"}</p>
                </div>
                <div>
                    <button onClick={openModal}>Modifier</button>
                    <button onClick={deleteUser}>Supprimer</button>
                </div>
            </article>
            <EditUserModal userId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} onClose={onClose} />
        </>
    )
}

export default UserItem;