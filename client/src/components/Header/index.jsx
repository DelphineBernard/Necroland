import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import { useLocation } from 'react-router-dom';


const Header = () => {
    const location = useLocation();
    const title = getTitleForPath(location.pathname);
    return (
        <header className="header">
            <nav className="nav">
                <Link to={"/"} title={"Retour à l'accueil"}>
                    <img src={Logo} alt="Necroland"/>
                </Link>
                <ul className="nav__links">
                    <li className="nav__links_item"><Link to={"attractions"}>Les attractions</Link></li>
                    <li className="nav__links_item"><Link to={"le-parc"}>Le parc</Link></li>
                    <li className="nav__links_item"><Link to={"infos-pratiques"}>Infos pratiques</Link></li>
                    <li className="nav__links_item"><Link to={"contact"}>Contact</Link></li>
                    <li className="nav__links_item"><Link to={"reservation"}>Réservation</Link></li>
                    <li className="nav__links_item"><Link to={"connexion"}>Connexion</Link></li>
                </ul>
            </nav>
            <div className="banner">
                <h1 className="banner__title">{title}</h1>
            </div>
        </header>
    )
}

// Définir la fonction getTitleForPath pour mapper les titres aux chemins d'URL
const getTitleForPath = (path) => {
    switch (path) {
      case '/':
        return "NecroLand";
      case '/attractions':
        return "Les attractions";
      case '/le-parc':
        return "Le parc";
      case '/infos-pratiques':
        return "Infos pratiques"; 
      case '/contact':
        return "Contact";
      case '/reservation':
        return "Réservation";
      case '/connexion':
        return "Connexion";
      case '/inscription':
        return "Inscription"; 
      case '/profil':
        return "Profil";
      case '/contact':
        return "Contact";
      case '/cgv':
        return "Les conditions générales de vente";
      case '/mentions-legales':
        return "Les mentions légales";
      case '/plan-du-site':
        return "Plan du site";
      case '/error404':
        return "Error 404";
      default:
        return "Necroland";
    }
}

export default Header;