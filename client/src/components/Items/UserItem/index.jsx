import { useState } from "react";
import EditUserModal from "../../Modals/EditUserModal";
import { Card, CardContent, Typography, Button, Container, Box } from '@mui/material';
import API_URL from "../../../config";

const UserItem = ({ element, onClose }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleteUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/user/${element.id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                const errorMessage = await response.json();
                console.error('Erreur lors de la suppression de l\'utilisateur:', errorMessage);
            }
            onClose();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
    }

    return (
        <Container sx={{display: "flex", justifyContent: 'center' }}>
            <Card style={{ marginBottom: '2rem', width: '100%' }} component="article">
                <CardContent>
                    <Typography style={{ color: 'black', fontWeight: 'bold' }}>
                        {element.firstname} {element.lastname}
                    </Typography>
                    <Typography style={{ color: 'black' }}>
                        Email : {element.email}
                    </Typography>
                    <Typography style={{ color: 'black' }}>
                        Adresse : {element.address}, {element.postal_code} {element.city}, {element.country}
                    </Typography>
                    <Typography style={{ color: 'black', marginBottom: '1rem' }}>
                        Rôle : {element.role_id === 1 ? "Membre" : "Administrateur"}
                    </Typography>
                    <Box sx={{display: 'flex', gap: '20px' }}>
                        <Button onClick={openModal} variant="contained">
                            Modifier
                        </Button>
                        <Button onClick={deleteUser} variant="contained">
                            Supprimer
                        </Button>
                    </Box>
                </CardContent>
                <EditUserModal userId={element.id} isOpen={isModalOpen} onRequestClose={closeModal} initialValues={element} onClose={onClose}/>
            </Card>
        </Container>
    )
}

export default UserItem;