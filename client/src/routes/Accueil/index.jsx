import { useEffect, useState } from "react";
import Header from "../../components/Header";

const Accueil = () => {

    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const fetchAttractions = async () => {
            const response = await fetch("http://localhost:3000/api/attractions");
            const data = await response.json();
            setAttractions(data.attractions);
        };
        fetchAttractions();
    }, []);

    return (
        <>
            {attractions.map(attraction => (
                <h2 key={attraction.id}>{attraction.name}</h2>
            ))}
        </>
    )
}

export default Accueil;