const UserItem = ({ element }) => (
    <article style={{ marginBottom: '2rem' }}>
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
);

export default UserItem;