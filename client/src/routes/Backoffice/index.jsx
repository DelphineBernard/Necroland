import { useState } from "react";
import CreateUserModal from "../../components/Modals/CreateUserModal";
import CreateAttractionModal from "../../components/Modals/CreateAttractionModal";
import UserItem from "../../components/Items/UserItem";
import AttractionItem from "../../components/Items/AttractionItem";
import PriceItem from "../../components/Items/PriceItem";
import TagItem from "../../components/Items/TagItem";
import MessageItem from "../../components/Items/MessageItem";
import ReservationItem from "../../components/Items/ReservationItem";
import CategoryItem from "../../components/Items/CategoryItem";

const Backoffice = () => {

    const [data, setData] = useState();
    const [selection, setSelection] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Au clic sur un des boutons, je mets à jour l'url du navigateur
    const updateUrl = (selection) => {
        let url = '/management';
        url += '/' + selection;
        window.history.pushState({}, '', url);
    };

    // Au clic sur un des boutons, je mets à jour les données affichées
    const handleClick = async (event) => {
        try {
            const selection = event.target.value;
            updateUrl(selection);
            const response = await fetch(`http://localhost:3000/api/${selection}`);
            const result = await response.json();
            setData(result[selection]);
            setSelection(selection);
        } catch (error) {
            console.log(error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main>
            <div>
                <button value={"users"} onClick={handleClick}>Gestion membres</button>
                <button value={"attractions"} onClick={handleClick}>Gestion attractions</button>
                <button value={"prices"} onClick={handleClick}>Gestion prix</button>
                <button value={"tags"} onClick={handleClick}>Gestion tags</button>
                <button value={"messages"} onClick={handleClick}>Gestion messages</button>
                <button value={"reservations"} onClick={handleClick}>Gestion réservations</button>
                <button value={"categories"} onClick={handleClick}>Gestion catégories</button>
            </div>
            {selection === "users" && <CreateUserModal isOpen={isModalOpen} onRequestClose={closeModal} />}
            {selection === "attractions" && <CreateAttractionModal isOpen={isModalOpen} onRequestClose={closeModal} />}

            <div>
                {data && (
                    <>
                        {/* Au clic sur le bouton, j'ouvre mon modal */}
                        <button onClick={openModal}>Créer</button>
                        <ul>
                            {data.map((element, index) => (
                                <li key={index}>
                                    {selection === "users" && <UserItem element={element} />}
                                    {selection === "attractions" && <AttractionItem element={element} />}
                                    {selection === "prices" && <PriceItem element={element} />}
                                    {selection === "tags" && <TagItem element={element} />}
                                    {selection === "messages" && <MessageItem element={element} />}
                                    {selection === "reservations" && <ReservationItem element={element} />}
                                    {selection === "categories" && <CategoryItem element={element} />}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </main>
    )
}

export default Backoffice;