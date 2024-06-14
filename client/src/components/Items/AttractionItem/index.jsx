import { useContext, useState, useEffect } from "react";
import { Context } from "../../Context";
import EditAttractionModal from "../../Modals/EditAttractionModal";
import API_URL from "../../../config";
import { Card, CardContent, Typography, Box, Button, Select, MenuItem, List, ListItem, IconButton, TextField, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AttractionItem = ({ element, onClose }) => {

    const { categories } = useContext(Context);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tagsAssociated, setTagsAssociated] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTagId, setSelectedTagId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [photosAssociated, setPhotosAssociated] = useState([]);

    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

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
            const response = await fetch(`${API_URL}/attractions/${element.id}/tags`, {
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
            await fetch(`${API_URL}/attractions/${element.id}`, {
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
                await fetch(`${API_URL}/photos/${element.id}`, {
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
            await fetch(`${API_URL}/attractions/${element.id}/tags/${tagId}`, {
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
            await fetch(`${API_URL}/photos/${photoId}`, {
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
            await fetch(`${API_URL}/attractions/${element.id}`, {
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
            <Card sx={{ marginBottom: '2rem', width: '100%' }} component="article">
                <CardContent>
                    <Typography sx={{ fontWeight: 'bold', color: 'black', marginBottom: '1rem' }}>
                        {element.name}
                    </Typography>
                    <Typography sx={{ color: 'black' }}>
                        Description : {element.description}
                    </Typography>
                    <Typography sx={{ color: 'black' }}>
                        Catégorie : {categories.find(category => category.id === element.category_id).name}
                    </Typography>
                    <Typography sx={{ marginTop: '1rem', color: 'black' }}>
                        Tags associés :
                    </Typography>
                    <List sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                        {tagsAssociated.map(tag => (
                            <ListItem key={tag.id} sx={{ color: 'black' }}>
                                {tag.name}
                                <IconButton edge="end" onClick={() => removeTag(tag.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', marginBottom: '1rem' }}>
                        <Select
                            value={selectedTagId}
                            onChange={e => setSelectedTagId(e.target.value)}
                            displayEmpty
                            sx={{ minWidth: '200px' }}
                        >
                            <MenuItem value="" disabled sx={{ color: 'black' }}>Choisissez un tag</MenuItem>
                            {tags.map(tag => (
                                <MenuItem key={tag.id} value={tag.id} sx={{ color: 'black' }}>{tag.name}</MenuItem>
                            ))}
                        </Select>
                        <Button variant="contained" onClick={addTag}>Ajouter un tag</Button>
                    </Box>

                    <Typography sx={{ marginTop: '1rem', color: 'black' }}>
                        Photos associées :
                    </Typography>
                    <List>
                        {photosAssociated.map(photo => (
                            <ListItem key={photo.id} sx={{ color: 'black' }}>
                                {photo.name}
                                <IconButton edge="end" onClick={() => removePhoto(photo.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', marginBottom: '1rem' }}>
                        <TextField type="file" onChange={changeSelectedFile} sx={{ minWidth: '200px' }} />
                        <Button variant="contained" onClick={addPhoto}>Ajouter une photo</Button>
                    </Box>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '1rem' }}>
                    <Button variant="contained" onClick={openModal}>Modifier</Button>
                    <Button variant="contained" onClick={removeAttraction}>Supprimer</Button>
                </Box>
            </Card>
            <EditAttractionModal
                attractionId={element.id}
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                initialValues={element}
                onClose={onClose}
            />
        </>
    )
}

export default AttractionItem;