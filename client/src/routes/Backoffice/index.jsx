import { useState, useEffect } from "react";
import CreateUserModal from "../../components/Modals/CreateUserModal";
import CreateAttractionModal from "../../components/Modals/CreateAttractionModal";
import CreatePriceModal from "../../components/Modals/CreatePriceModal";
import CreateTagModal from "../../components/Modals/CreateTagModal";
import CreateCategoryModal from "../../components/Modals/CreateCategoryModal";
import UserItem from "../../components/Items/UserItem";
import AttractionItem from "../../components/Items/AttractionItem";
import PriceItem from "../../components/Items/PriceItem";
import TagItem from "../../components/Items/TagItem";
import MessageItem from "../../components/Items/MessageItem";
import ReservationItem from "../../components/Items/ReservationItem";
import CategoryItem from "../../components/Items/CategoryItem";
import API_URL from '../../config.js';
import { Tabs, Tab, Box, useMediaQuery, useTheme, Container, Button, Alert } from '@mui/material';

const Backoffice = () => {

    const [data, setData] = useState([]);
    const [selection, setSelection] = useState("users");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const fetchData = async (selectedValue) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/${selectedValue}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            const result = await response.json();
            setData(result[selectedValue]);
            setSelection(selectedValue);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData(selection);
    }, []);

    // Update data when a tab is clicked
    const handleTabChange = (event, newValue) => {
        fetchData(newValue);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchData(selection);
    };

    return (
        <main>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 2 }}>
                <Tabs
                    variant='scrollable'
                    scrollButtons={isDesktop ? 'auto' : false}
                    allowScrollButtonsMobile
                    orientation={isDesktop ? 'horizontal' : 'vertical'}
                    value={selection}
                    onChange={handleTabChange}
                >
                    <Tab label="Gestion membres" value="users" sx={{ color: 'white' }} />
                    <Tab label="Gestion attractions" value="attractions" sx={{ color: 'white' }} />
                    <Tab label="Gestion prix" value="prices" sx={{ color: 'white' }} />
                    <Tab label="Gestion tags" value="tags" sx={{ color: 'white' }} />
                    <Tab label="Gestion messages" value="messages" sx={{ color: 'white' }} />
                    <Tab label="Gestion réservations" value="reservations" sx={{ color: 'white' }} />
                    <Tab label="Gestion catégories" value="categories" sx={{ color: 'white' }} />
                </Tabs>
            </Box>

            {selection === "users" && <CreateUserModal isOpen={isModalOpen} onRequestClose={closeModal} />}
            {selection === "attractions" && <CreateAttractionModal isOpen={isModalOpen} onRequestClose={closeModal} />}
            {selection === "prices" && <CreatePriceModal isOpen={isModalOpen} onRequestClose={closeModal} />}
            {selection === "tags" && <CreateTagModal isOpen={isModalOpen} onRequestClose={closeModal} />}
            {selection === "categories" && <CreateCategoryModal isOpen={isModalOpen} onRequestClose={closeModal} />}

            <Container component="section" sx={{margin: 'auto', marginTop: '1rem', marginBottom: '1rem' }}>
                {data && (
                    <>
                        {/* Au clic sur le bouton, j'ouvre mon modal */}
                        {(selection !== undefined && selection !== "reservations" && selection !== "messages") && <Button sx={{margin: '2rem'}} onClick={openModal}>Créer</Button>}
                        {selection === "tags" && <Alert variant="outlined" severity="warning" sx={{marginBottom: '2rem' }}>Attention : Pour être supprimé, le tag ne doit être associé à aucune attraction.</Alert>}
                        {selection === "attractions" && <Alert variant="outlined" severity="warning" sx={{marginBottom: '2rem'}}>Attention : Pour être supprimée, l'attraction ne doit être associée à aucun tag et à aucune photo.</Alert>}
                        <ul>
                            {data.map((element, index) => (
                                <li key={index}>
                                    {selection === "users" && <UserItem element={element} onClose={closeModal} />}
                                    {selection === "attractions" && <AttractionItem element={element} onClose={closeModal} />}
                                    {selection === "prices" && <PriceItem element={element} onClose={closeModal} />}
                                    {selection === "tags" && <TagItem element={element} onClose={closeModal} />}
                                    {selection === "messages" && <MessageItem element={element} onClose={closeModal} />}
                                    {selection === "reservations" && <ReservationItem element={element} onClose={closeModal} />}
                                    {selection === "categories" && <CategoryItem element={element} onClose={closeModal} />}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Container>
        </main>
    )
}

export default Backoffice;