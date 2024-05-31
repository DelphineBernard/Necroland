import { useContext, useState, useEffect } from "react";
import { Context } from "../../Context";
import EditAttractionModal from "../../Modals/EditAttractionModal";
import API_URL from "../../../config";

const AttractionItem = ({ element, onClose }) => {

    const { categories } = useContext(Context);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tagsAssociated, setTagsAssociated] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTagId, setSelectedTagId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [photosAssociated, setPhotosAssociated] = useState([]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchTags = async () => {
        const response = await fetch(`${API_URL}/tags`);
        const data = await response.json();
        setTags(data.tags);
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

    const fetchPhotosAssociated = async () => {
        try {
            const response = await fetch(`${API_URL}/photos/${element.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setPhotosAssociated(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des photos associées :", error);
        }
    };

    const addTag = async () => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/attraction/${element.id}/addtag`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tagId: selectedTagId }),
            });
            fetchTagsAssociated();
        } catch (error) {
            console.error("Erreur lors de l'ajout du tag associé :", error);
        }
    };

    const addPhoto = async () => {
        try {
            const token = localStorage.getItem('token');
    
            if (selectedFile) {
                const photoData = {
                    name: selectedFile
                }
                await fetch(`${API_URL}/photo/${element.id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(photoData),
                });
                fetchPhotosAssociated();
            } else {
                console.error("Aucun fichier sélectionné");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la photo :", error);
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

    const removePhoto = async (photoId) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/photo/${photoId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setPhotosAssociated(photosAssociated.filter(photo => photo.id !== photoId));
        } catch (error) {
            console.error("Erreur lors de la suppression de la photo :", error);
        }
    };

    const removeAttraction = async (req, res) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/attraction/delete/${element.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            onClose();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'attraction :", error);
        }
    };

    const changeSelectedFile = (event) => {
        const fileName = event.target.files[0].name;
        setSelectedFile(fileName);
    };

    useEffect(() => {
        fetchTagsAssociated();
        fetchPhotosAssociated();
        fetchTags();
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
                    <div>
                        <select value={selectedTagId} onChange={e => setSelectedTagId(e.target.value)}>
                            <option value="" disabled>Choisissez un tag</option>
                            {tags.map(tag => (
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                            ))}
                        </select>
                        <button onClick={addTag}>Ajouter un tag</button>
                    </div>
                    <p>Photos associées :</p>
                    <ul>
                        {photosAssociated.map(photo => (
                            <li key={photo.id}>
                                {photo.name}
                                <button onClick={() => removePhoto(photo.id)}>
                                    Retirer
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div>
                        <input type="file" id="fileInput" onChange={changeSelectedFile} />
                        <button onClick={addPhoto}>Ajouter une photo</button>
                    </div>

                </div>
                <div>
                    <button onClick={openModal}>Modifier</button>
                    <button onClick={removeAttraction}>Supprimer</button>
                </div>
            </article>
            <EditAttractionModal attractionId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} />
        </>
    )
}

export default AttractionItem;