import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import API_URL from '../../config.js';

const CategoryTabs = () => {
    const { categories, setCategories, setAttractions } = useContext(Context);
    const { category } = useParams(); // Récupère le paramètre de catégorie de l'URL
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/categories`);
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAttractions = async (category) => {
        try {
            let response;
            category === "all" || !category ? response = await fetch(`${API_URL}/attractions`) : response = await fetch(`${API_URL}/attractions/${category}`);
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };
    const handleClick = (event) => {
        const selectedCategory = event.target.value;
        navigate(`/attractions/${selectedCategory !== "all" ? selectedCategory : ""}`);
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    useEffect(() => {
        fetchAttractions(category);
    }, [category]);

    
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
    );
}
export default CategoryTabs;