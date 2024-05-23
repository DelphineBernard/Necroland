import { useContext } from "react";
import { Context } from "../../Context";

const AttractionItem = ({ element }) => {

    const { categories } = useContext(Context);

    return (
        <article style={{ marginBottom: '2rem' }}>
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
    )
}

export default AttractionItem;