import { useContext, useState, useEffect } from "react";
import { Context } from "../../components/Context";

const Backoffice = () => {

    const [data, setData] = useState();
    const [selection, setSelection] = useState();
    const [status, setStatus] = useState();
    const [users, setUsers] = useState();
    const { categories } = useContext(Context);

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
    }

    const fetchStatus = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/status");
            const data = await response.json();
            setStatus(data.status);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users");
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStatus();
        fetchUsers();
    }, []);

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
            <button>Créer</button>
            <div>
            {data && (
                    <ul>
                        {data.map((element, index) => (
                            <li key={index}>
                                {selection === "users" && (
                                    <article style={{marginBottom: '2rem'}}>
                                        <div>
                                            <p>Nom : {element.firstname}</p>
                                            <p>Prénom : {element.lastname}</p>
                                            <p>Adresse : {element.address}</p>
                                            <p>Code postal : {element.postal_code}</p>
                                            <p>Ville : {element.city}</p>
                                            <p>Pays : {element.country}</p>
                                            <p>Rôle : {element.role_id === 1 ? "Membre" : "Administrateur"}</p>
                                        </div>
                                        <div>
                                            <button>Modifier</button>
                                            <button>Supprimer</button>
                                        </div>
                                    </article>
                                )}
                                {selection === "attractions" && (
                                    <article style={{marginBottom: '2rem'}}>
                                        <div>
                                            <p>Nom : {element.name}</p>
                                            <p>Description : {element.description}</p>
                                            <p>Catégorie : {
                                                categories.find(category => category.id === element.category_id).name
                                            }</p>
                                        </div>
                                        <div>
                                            <button>Modifier</button>
                                            <button>Supprimer</button>
                                        </div>
                                    </article> 
                                )}
                                {selection === "prices" && (
                                    <article style={{marginBottom: '2rem'}}>
                                        <div>
                                            <p>Durée : {element.duration > 1 ? `${element.duration} jours` : `${element.duration} jour`}</p>
                                            <p>Prix : {element.price}€</p>
                                            <p>Avec hôtel : {element.hotel ? "Oui" : "Non"}</p>
                                        </div>
                                        <div>
                                            <button>Modifier</button>
                                            <button>Supprimer</button>
                                        </div>
                                    </article> 
                                )}
                                {selection === "tags" && (
                                    <article style={{marginBottom: '2rem'}}>
                                        <div>
                                            <p>Nom : {element.name}</p>
                                        </div>
                                        <div>
                                            <button>Modifier</button>
                                            <button>Supprimer</button>
                                        </div>
                                    </article> 
                                )}
                                {selection === "messages" && (
                                    <article style={{marginBottom: '2rem'}}>
                                        <div>
                                            <p>Nom : {element.lastname}</p>
                                            <p>Prénom : {element.firstname}</p>
                                            <p>Email : {element.email}</p>
                                            <p>Objet : {element.object}</p>
                                            <p>Contenu : {element.content}</p>
                                            <p>Statut : {
                                                status.find(status => status.id === element.status_id).label
                                            }</p>
                                        </div>
                                        <div>
                                            <button>Modifier</button>
                                            <button>Supprimer</button>
                                        </div>
                                    </article> 
                                )}
                                {selection === "reservations" && (
                                    <article style={{marginBottom: '2rem'}}>
                                        <div>
                                            <p>Date de début : {element.start_date}</p>
                                            <p>Date de fin : {element.end_date}</p>
                                            <p>Nombre de personnes : {element.nb_people}</p>
                                            <p>Hôtel compris : {element.hotel ? "Oui" : "Non"}</p>
                                            <p>Prix total : {element.total_price}€</p>
                                            <p>Réservation effectuée par : 
                                                <span>{users.find(user => user.id === element.user_id).lastname}</span>
                                                <span>{users.find(user => user.id === element.user_id).firstname}</span>
                                                <span>{users.find(user => user.id === element.user_id).email}</span>
                                            </p>
                                            <p>Statut : {
                                                status.find(status => status.id === element.status_id).label
                                            }</p>
                                        </div>
                                        <div>
                                            <button>Modifier</button>
                                            <button>Supprimer</button>
                                        </div>
                                    </article> 
                                )}
                                {selection === "categories" && (
                                    <article style={{marginBottom: '2rem'}}>
                                        <div>
                                            <p>Nom : {element.name}</p>
                                        </div>
                                        <div>
                                            <button>Modifier</button>
                                            <button>Supprimer</button>
                                        </div>
                                    </article> 
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    )
}

export default Backoffice;