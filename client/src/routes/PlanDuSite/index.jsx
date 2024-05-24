import { Link } from "react-router-dom";

const PlanDuSite =() =>{
    return (
        <section>
            <h2>Que recherchez-vous ?</h2>

            <div>
                <Link to="/attractions">Les attractions</Link>
                <div>
                    <p><Link to="/attractions/rollercoaster">Rollercoaster</Link></p>
                    <p><Link to="/attractions/restaurant">Restaurant</Link></p>
                    <p><Link to="/attractions/experience-immersive">Expérience immersive</Link></p>
                </div>
            </div>
            
            <div>
                <Link to="/le-parc">Le parc</Link>
                <div>
                    <p><Link to="/le-parc#presentation">Présentation</Link></p> 
                    <p><Link to="/le-parc#plan-du-parc">Plan du parc</Link></p>
                </div>
            </div>

            <div>
                <Link to="/infos-pratiques">Infos pratiques</Link>
                <div>
                    <p><Link to="/infos-pratiques#tarifs">Les tarifs</Link></p> 
                    <p><Link to="/infos-pratiques#hotel">L'hôtel</Link></p>
                    <p><Link to="/infos-pratiques#itineraire">Venir au parc</Link></p>
                </div>
            </div>

            <div>
                <Link to="/inscription">Inscription</Link>
            </div>

            <div>
                <Link to="/connexion">Connexion</Link>
            </div>

            <div>
                <Link to="/profil">Profil</Link>
            </div>

            <div>
                <Link to="/reservation">Réservation</Link>
            </div>

            <div>
                <Link to="/paiement">Paiement</Link>
            </div>

            <div>
                <Link to="/contact">Contact</Link>
            </div>

            <div>
                <Link to="/cgv">Les conditions générales de vente</Link>
            </div>

            <div>
                <Link to="/mentions-legales">Mentions Légales</Link>
            </div>
        </section>
    );
};

export default PlanDuSite;