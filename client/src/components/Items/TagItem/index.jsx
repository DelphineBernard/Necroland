import EditTagModal from "../../Modals/EditTagModal";
import { useState } from "react";

const TagItem = ({ element, onClose }) => {

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
                    <p>Nom : {element.name}</p>
                </div>
                <div>
                    <button onClick={openModal}>Modifier</button>
                    <button>Supprimer</button>
                </div>
            </article>
            <EditTagModal tagId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} onClose={onClose} />
        </>
    )
}

export default TagItem;