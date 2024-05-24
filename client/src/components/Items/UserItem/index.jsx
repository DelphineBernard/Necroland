import { useState } from "react";
import EditUserModal from "../../Modals/EditUserModal";

const UserItem = ({ element }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                    <button>Supprimer</button>
                </div>
            </article>
            <EditUserModal userId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} />
        </>
    )
}

export default UserItem;