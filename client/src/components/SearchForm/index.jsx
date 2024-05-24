import { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import slugify from 'slugify';

const SearchForm = () => {
    // Récupère les données nécessaires du Context
    const { tags, setTags, setAttractions, tagSearched, setTagSearched } = useContext(Context);
    // État local pour stocker les suggestions de tags filtrés
    const [filteredTags, setFilteredTags] = useState([]);

    // Fonction asynchrone pour récupérer les tags depuis l'API
    const fetchTags = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tags");
            const data = await response.json();
            setTags(data.tags); // Met à jour les tags dans le Context
        } catch (error) {
            console.log(error);
        }
    };

    // Fonction de gestion de la recherche par tag
    const handleSearchByTag = async (event) => {
        try {
            event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
            // Convertit la valeur du champ de recherche en slug
            const tag = slugify(event.target[0].value, { remove: /[*+~.()'"!:@]/g, lower: true }); //Récupère la valeur saisie dans le formulaire, puis transforme la valeur en un slug
            if (tag) {
                const response = await fetch(`http://localhost:3000/api/attractions/tags/${tag}`);
                const data = await response.json();
                setAttractions(data.attractions.Attractions); // Met à jour les attractions dans le Context
                setFilteredTags([]); // Vide les suggestions après la recherche
            } else {
                fetchAllAttractions(); // Réinitialise toutes les attractions si le champ de recherche est vide
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Fonction pour récupérer toutes les attractions
    const fetchAllAttractions = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/attractions");
            const data = await response.json();
            setAttractions(data.attractions); // Met à jour les attractions dans le Context
        } catch (error) {
            console.log(error);
        }
    };

    // Fonction de gestion de la saisie dans le champ de recherche
    const handleChange = (event) => {
        const value = event.target.value;
        setTagSearched(value); // Met à jour la valeur de recherche dans le Context

        if (value) {
            // Filtre les tags dont le slug commence par la valeur saisie
            const slugifiedValue = slugify(value, { remove: /[*+~.()'"!:@]/g, lower: true });
            const filtered = tags.filter(tag => tag.slug.startsWith(slugifiedValue));
            setFilteredTags(filtered); // Met à jour les suggestions filtrées
        } else {
            setFilteredTags([]); // Vide les suggestions si le champ de recherche est vide
            fetchAllAttractions(); // Réinitialise toutes les attractions si le champ de recherche est vide
        }
    };

    // Fonction de gestion du clic sur une suggestion de tag
    const handleSuggestionClick = async (suggestion) => {
        setTagSearched(suggestion.name); // Remplit le champ de recherche avec la suggestion cliquée
        setFilteredTags([]); // Vide les suggestions

        // Recherche des attractions associées à la suggestion sélectionnée
        const tag = slugify(suggestion.name, { remove: /[*+~.()'"!:@]/g, lower: true });
        const response = await fetch(`http://localhost:3000/api/attractions/tags/${tag}`);
        const data = await response.json();
        setAttractions(data.attractions.Attractions); // Met à jour les attractions dans le Context
    };

    // Récupère les tags lors du montage du composant
    useEffect(() => {
        fetchTags();
        fetchAllAttractions(); // Récupère toutes les attractions initialement
    }, []);

    return (
        <div className="searchBar">
            <form onSubmit={handleSearchByTag}>
                <label className="sr-only" htmlFor="tag">Recherche par tag</label>
                <input
                    type="text"
                    value={tagSearched} // Lie la valeur du champ de recherche à l'état du Context
                    onChange={handleChange} // Appelle handleChange à chaque changement de valeur
                    autoComplete="off"
                />
                <button>Rechercher</button>
            </form>
            {filteredTags.length > 0 && ( // Affiche les suggestions filtrées si elles existent
                <ul>
                    {filteredTags.map((tag) => (
                        <li key={tag.id} onClick={() => handleSuggestionClick(tag)}>
                            {tag.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchForm;