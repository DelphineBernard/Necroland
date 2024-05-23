const TagItem = ({ element }) => {
    return (
        <article style={{ marginBottom: '2rem' }}>
            <div>
                <p>Nom : {element.name}</p>
            </div>
            <div>
                <button>Modifier</button>
                <button>Supprimer</button>
            </div>
        </article>
    )
}

export default TagItem;