import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <main>
            <section>
                <h2>Ouverture du parc dans 1 mois</h2>
                <div>
                    <h3>Bienvenue à Necroland !</h3>
                    <div>
                        <p>Entrez dans un monde où les morts ne dorment <span>jamais</span>.</p>
                        <img src="" alt="" />
                    </div>
                    
                    <p>Préparez-vous </p>
                    
                </div> 
            </section>
            <section>
                <h2>Des attractions aussi terrifiantes les unes que les autres</h2>
                <div>

                </div>
                <Link to={"/infos-pratiques"}></Link>
            </section>
        </main>
    )
}

export default Accueil;