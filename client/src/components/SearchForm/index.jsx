import { useContext, useEffect } from "react";
import { Context } from "../Context";

const SearchForm = () => {

    const { tags, setTags } = useContext(Context);

    const fetchTags = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tags");
            const data = await response.json();
            setTags(data.tags);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFormSubmit = async (event) => {
        try {
            event.preventDefault();
            const tag = event.target[1].value;
            const response = await fetch("")
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <form onSubmit={handleFormSubmit}>
            <label className="hidden" htmlFor="tag">Recherche par tag</label>
            <select name="tag" id="tag">
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.slug}>{tag.name}</option>
                ))}
            </select>
            <button type="submit"></button>
        </form>
    )
}

export default SearchForm;

