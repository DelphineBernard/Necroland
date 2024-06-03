import EditPriceModal from "../../Modals/EditPriceModal";
import { useState } from "react";
import API_URL from "../../../config";

const PriceItem = ({ element, onClose }) => {

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
            const response = await fetch(`${API_URL}/price/delete/${element.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                console.error('Erreur lors de la suppression du prix:', errorMessage);
            }
            onClose();
        } catch (error) {
            console.error('Erreur lors de la suppression du prix:', error);
        }
    };

    return (
        <>
            <article style={{ marginBottom: '2rem' }}>
                <div>
                    <p>Durée : {element.duration > 1 ? `${element.duration} jours` : `${element.duration} jour`}</p>
                    <p>Prix : {element.price}€</p>
                    <p>Avec hôtel : {element.hotel ? "Oui" : "Non"}</p>
                </div>
                <div>
                    <button onClick={openModal}>Modifier</button>
                    <button onClick={handleDelete}>Supprimer</button>
                </div>
            </article>
            <EditPriceModal priceId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} onClose={onClose} />
        </>
    )
}

export default PriceItem;