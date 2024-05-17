import { useContext, useEffect } from "react";
import { Context } from "../Context";
import slugify from 'slugify';

const SearchForm = () => {
    // Je récupère les données du Context dont j'ai besoin
    const { tags, setTags, setAttractions, tagSearched, setTagSearched } = useContext(Context);

    const fetchTags = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tags");
            const data = await response.json();
            setTags(data.tags);
        } catch (error) {
            console.log(error);
        }
    };

    // Lorsque l'utilisateur valide le formulaire de recherche par tag, je mets à jour le state attractions avec les attractions associées au tag
    const handleSearchByTag = async (event) => {
        try {
            event.preventDefault();
            const tag = slugify(event.target[0].value, { remove: /[*+~.()'"!:@]/g, lower: true });
            const response = await fetch(`http://localhost:3000/api/attractions/tags/${tag}`)
            const data = await response.json();
            setAttractions(data.attractions.Attractions);
        } catch (error) {
            console.log(error);
        }
    };

    // A chaque fois que l'utilisateur saisit une lettre, je mets à jour la liste des tags s'affichant sous le champ de recherche
    const handleChange = (event) => {
        setTagSearched(event.target.value)
    };

    // Au chargement du composant, je récupère tous les tags pour mettre à jour les tags qui vont être affichés sous le champ de recherche en fonction de la saisie de l'utilisateur
    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div className="searchBar">
            <form onSubmit={handleSearchByTag}>
                <label className="sr-only" htmlFor="tag">Recherche par tag</label>
                <input type="text" value={tagSearched} onChange={handleChange}/>
                <button>Rechercher</button>
            </form>
            <ul>
                {tagSearched &&
                    tags.filter((tag) => tag.slug.startsWith(slugify(tagSearched, { remove: /[*+~.()'"!:@]/g, lower: true })))
                    .map((tag) => <li key={tag.id}>{tag.name}</li>)
                }
            </ul>
        </div>
    )
}

export default SearchForm;

