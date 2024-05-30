import EditPriceModal from "../../Modals/EditPriceModal";
import { useState } from "react";

const PriceItem = ({ element, onClose }) => {

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
                    <p>Durée : {element.duration > 1 ? `${element.duration} jours` : `${element.duration} jour`}</p>
                    <p>Prix : {element.price}€</p>
                    <p>Avec hôtel : {element.hotel ? "Oui" : "Non"}</p>
                </div>
                <div>
                    <button onClick={openModal}>Modifier</button>
                    <button>Supprimer</button>
                </div>
            </article>
            <EditPriceModal priceId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} onClose={onClose} />
        </>
    )
}

export default PriceItem;