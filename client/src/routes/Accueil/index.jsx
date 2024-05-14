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
                    <p>Entrez dans un monde où les morts ne dorment jamais.</p>
                    <p>Préparez-vous </p>
                    <p>ZombieLand Adventure Park, où l'horreur rencontre l'aventure, et où chaque visiteur
devient un survivant. Réservez votre billet pour une expérience inoubliable, mais
n'oubliez pas : dans ZombieLand, chaque coin sombre peut cacher un secret
terrifiant.</p>
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