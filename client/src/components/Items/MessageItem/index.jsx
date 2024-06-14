import { useEffect, useState } from "react";
import API_URL from '../../../config.js';
import { Button, Typography, Box, Card, CardContent } from "@mui/material";

const MessageItem = ({ element, onClose }) => {

    const [status, setStatus] = useState([]);

    const fetchStatus = async () => {
        try {
            const response = await fetch(`${API_URL}/status`);
            const data = await response.json();
            setStatus(data.status);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const updateMessageStatus = async (messageId) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/messages/${messageId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status_id: 4 }),
            });
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const currentStatus = status.find(status => status.id === element.status_id);

    return (
        <Card sx={{ marginBottom: '2rem', width: '100%' }} component="article">
            <CardContent>
                <Typography sx={{ color: 'black' }}>Nom : {element.lastname}</Typography>
                <Typography sx={{ color: 'black' }}>Prénom : {element.firstname}</Typography>
                <Typography sx={{ color: 'black' }}>Email : {element.email}</Typography>
                <Typography sx={{ color: 'black' }}>Objet : {element.object}</Typography>
                <Typography sx={{ color: 'black' }}>Contenu : {element.content}</Typography>
                <Typography sx={{ color: 'black' }}>Statut : {currentStatus ? currentStatus.label : 'Loading...'}</Typography>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, gap: '1rem', marginTop: '1rem', flexDirection: { xs: 'column', sm: 'row' } }}>
                    {currentStatus && currentStatus.label !== 'Traité' && (
                        <Button onClick={() => updateMessageStatus(element.id)}>Marquer comme classé</Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}

export default MessageItem;