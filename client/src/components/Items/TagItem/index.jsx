import EditTagModal from "../../Modals/EditTagModal";
import { useState } from "react";
import API_URL from "../../../config";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";

const TagItem = ({ element, onClose }) => {

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
            const response = await fetch(`${API_URL}/tag/delete/${element.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                console.error('Erreur lors de la suppression du tag:', errorMessage);
            }
            onClose();
        } catch (error) {
            console.error('Erreur lors de la suppression du tag:', error);
        }
    };

    return (
        <>
            <Card sx={{ marginBottom: '2rem', width: '100%' }} component="article">
                <CardContent>
                    <Typography sx={{ color: 'black' }}>Nom : {element.name}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: '1rem', marginTop: '1rem', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Button onClick={openModal}>Modifier</Button>
                        <Button onClick={handleDelete}>Supprimer</Button>
                    </Box>
                </CardContent>
            </Card>
            <EditTagModal tagId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} onClose={onClose} />
        </>
    )
}

export default TagItem;