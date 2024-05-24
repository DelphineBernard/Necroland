import { Link } from "react-router-dom";

const PlanDuSite = () => {
    return (
        <section className="site-map">
            <h2 className="site-map__title">Que recherchez vous ?</h2>

            <div className="site-map__block">
                <Link to="/attractions" className="site-map__link">Les attractions</Link>
                <ul className="site-map__sub-links">
                    <li><Link to="/attractions/rollercoaster" className="site-map__sub-link">Rollercoaster</Link></li>
                    <li><Link to="/attractions/restaurant" className="site-map__sub-link">Restaurant</Link></li>
                    <li><Link to="/attractions/experience-immersive" className="site-map__sub-link">Expérience immersive</Link></li>
                </ul>
            </div>
            
            <div className="site-map__block">
                <Link to="/le-parc" className="site-map__link">Le parc</Link>
                <ul className="site-map__sub-links">
                    <li><Link to="/le-parc#presentation" className="site-map__sub-link">Présentation</Link></li> 
                    <li><Link to="/le-parc#plan-du-parc" className="site-map__sub-link">Plan du parc</Link></li>
                </ul>
            </div>

            <div className="site-map__block">
                <Link to="/infos-pratiques" className="site-map__link">Infos pratiques</Link>
                <ul className="site-map__sub-links">
                    <li><Link to="/infos-pratiques#tarifs" className="site-map__sub-link">Les tarifs</Link></li> 
                    <li><Link to="/infos-pratiques#hotel" className="site-map__sub-link">L'hôtel</Link></li>
                    <li><Link to="/infos-pratiques#itineraire" className="site-map__sub-link">Venir au parc</Link></li>
                </ul>
            </div>

            <div className="site-map__block">
                <Link to="/inscription" className="site-map__link">Inscription</Link>
            </div>

            <div className="site-map__block">
                <Link to="/connexion" className="site-map__link">Connexion</Link>
            </div>

            <div className="site-map__block">
                <Link to="/profil" className="site-map__link">Profil</Link>
            </div>

            <div className="site-map__block">
                <Link to="/reservation" className="site-map__link">Réservation</Link>
            </div>

            <div className="site-map__block">
                <Link to="/paiement" className="site-map__link">Paiement</Link>
            </div>

            <div className="site-map__block">
                <Link to="/contact" className="site-map__link">Contact</Link>
            </div>

            <div className="site-map__block">
                <Link to="/cgv" className="site-map__link">Les conditions générales de vente</Link>
            </div>

            <div className="site-map__block">
                <Link to="/mentions-legales" className="site-map__link">Mentions Légales</Link>
            </div>
        </section>
    );
};

export default PlanDuSite;