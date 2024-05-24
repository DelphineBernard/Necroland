const PriceItem = ({ element }) => {
    return (
        <article style={{ marginBottom: '2rem' }}>
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
    )
}

export default PriceItem;