import { useContext, useState, useEffect } from "react";
import { Context } from "../../Context";
import EditAttractionModal from "../../Modals/EditAttractionModal";
import API_URL from "../../../config";

const AttractionItem = ({ element }) => {

    const { categories } = useContext(Context);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tagsAssociated, setTagsAssociated] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchTagsAssociated = async () => {
        try {
            const response = await fetch(`${API_URL}/attraction/tags/${element.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setTagsAssociated(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des tags associés :", error);
        }
    };

    const removeTag = async (tagId) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/attraction/${element.id}/tag/${tagId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setTagsAssociated(tagsAssociated.filter(tag => tag.id !== tagId));
        } catch (error) {
            console.error("Erreur lors de la suppression du tag associé :", error);
        }
    };

    useEffect(() => {
        fetchTagsAssociated();
    }, []);

    return (
        <>
            <article style={{ marginBottom: '2rem' }}>
                <div>
                    <p>Nom : {element.name}</p>
                    <p>Description : {element.description}</p>
                    <p>Catégorie : {
                        categories.find(category => category.id === element.category_id).name
                    }</p>
                    <p>Tags associés :</p>
                    <ul>
                        {tagsAssociated.map(tag => (
                            <li key={tag.id}>
                            {tag.name}
                            <button onClick={() => removeTag(tag.id)}>
                                Retirer
                            </button>
                        </li>
                        ))}
                    </ul>
                    <button>Associer un tag</button>
                </div>
                <div>
                    <button onClick={openModal}>Modifier</button>
                    <button>Supprimer</button>
                </div>
            </article>
            <EditAttractionModal attractionId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} />
        </>
    )
}

export default AttractionItem;