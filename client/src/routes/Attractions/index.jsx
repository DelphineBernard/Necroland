import Alerte from "../../assets/icons/alerte.png";
import Card from "../../components/Card";
import { useContext, useEffect } from "react";
import SearchForm from "../../components/SearchForm";
import CategoryTabs from "../../components/CategoryTabs";
import { Context } from "../../components/Context";
import { useParams } from "react-router-dom";

const Attractions = () => {
    // Je récupère les données du Context dont j'ai besoin
    const { attractions, setAttractions } = useContext(Context);
    const { category } = useParams(); // Récupère le paramètre de catégorie de l'URL

    const fetchAttractions = async () => {
        try {
            let response;
            category ? response = await fetch(`http://localhost:3000/api/attractions/${category}`) : response = await fetch(`http://localhost:3000/api/attractions`);
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };
    // Par défaut, au chargement de la page Attractions, j'affiche toutes les attractions
    useEffect(() => {
        fetchAttractions();
    }, [category]); // Re-fetch les attractions chaque fois que la catégorie change
    
    return (
        <main>
            <div>
                <img src={Alerte} alt="" />
                <p>Le parc est interdit au moins de 16 ans</p>
            </div>
            <div>
                <CategoryTabs />
                <SearchForm />
            </div>
            <section>
                <h2>Des attractions à couper le souffle</h2>
                <div>
                    {attractions.map((attraction) => (
                        <Card
                            key={attraction.id}
                            name={attraction.name}
                            // img={}
                            description={attraction.description}
                            // category={}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Attractions;