import { useEffect, useContext } from "react";
import { Context } from "../Context";

const CategoryTabs = () => {
    
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

    const handleClick = async (event) => {
        try {
            const category = event.target.value;
            console.log(category);
            let response;
            category === "all" ? response = await fetch(`http://localhost:3000/api/attractions`) : response = await fetch(`http://localhost:3000/api/attractions/${category}`);
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };

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