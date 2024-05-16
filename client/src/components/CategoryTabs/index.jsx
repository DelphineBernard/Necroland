import { useEffect, useContext } from "react";
import { Context } from "../Context";

const CategoryTabs = () => {
    // Je récupère les données du Context dont j'ai besoin
    const { categories, setCategories, setAttractions } = useContext(Context);

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/categories");
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    // Fonction permettant de mettre à jour l'url lors du clic sur le bouton associé à la catégorie souhaitée
    const updateUrl = (category) => {
        let url = '/attractions';
        if (category !== "all") {
            url += '/' + category;
        }
        window.history.pushState({}, '', url);
    };

    // Dès que l'utilisateur clique sur la catégorie qu'il souhaite, je mets à jour le state attractions avec les attractions associées à la catégorie
    const handleClick = async (event) => {
        try {
            const category = event.target.value;
            updateUrl(category);
            let response;
            category === "all" ? response = await fetch(`http://localhost:3000/api/attractions`) : response = await fetch(`http://localhost:3000/api/attractions/${category}`);
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };

    // Au chargement du composant, je récupère toutes les catégories pour mettre à jour les tabs affichés
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <button value={"all"} onClick={handleClick}>Toutes les attractions</button>
            {categories.map((category) => (
                <button
                    onClick={handleClick}
                    key={category.id}
                    value={category.slug}
                >{category.name}
                </button>
            ))}
        </>
    )
    
}

export default CategoryTabs;