import EditCategoryModal from "../../Modals/EditCategoryModal";
import { useState } from "react";
import API_URL from "../../../config";
import { Button, Typography, Box, Card, CardContent } from "@mui/material";

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
            <Card sx={{ marginBottom: '2rem', width: '100%' }} component="article">
                <CardContent>
                    <Typography sx={{ color: 'black' }}>Nom : {element.name}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: '1rem', marginTop: '1rem', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Button onClick={openModal}>Modifier</Button>
                        <Button onClick={handleDelete}>Supprimer</Button>
                    </Box>
                </CardContent>
            </Card>
            <EditCategoryModal categoryId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} onClose={onClose} />
        </>
    )
}

export default CategoryItem;