import EditCategoryModal from "../../Modals/EditCategoryModal";
import { useState } from "react";
import API_URL from "../../../config";

const CategoryItem = ({ element, onClose }) => {

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
            const response = await fetch(`${API_URL}/category/delete/${element.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                console.error('Erreur lors de la suppression de la catégorie:', errorMessage);
            }
            onClose();
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie:', error);
        }
    };

    return (
        <>
            <article style={{ marginBottom: '2rem' }}>
                <div>
                    <p>Nom : {element.name}</p>
                </div>
                <div>
                    <button onClick={openModal}>Modifier</button>
                    <button onClick={handleDelete}>Supprimer</button>
                </div>
            </article>
            <EditCategoryModal categoryId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} onClose={onClose} />
        </>
    )
}

export default CategoryItem;