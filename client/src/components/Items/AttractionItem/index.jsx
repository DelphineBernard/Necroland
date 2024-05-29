import { useContext, useState } from "react";
import { Context } from "../../Context";
import EditAttractionModal from "../../Modals/EditAttractionModal";

const AttractionItem = ({ element }) => {

    const { categories } = useContext(Context);

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
                    <p>Description : {element.description}</p>
                    <p>Catégorie : {
                        categories.find(category => category.id === element.category_id).name
                    }</p>
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