import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import Avatar from "../../assets/icons/avatar.png";
import Banner from "../../assets/img/banner3.jpg";
import Menu from "../../assets/icons/menu.png";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import LogoutButton from "../LogoutButton";
import { useSelector } from 'react-redux';

const Header = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isAdmin = useSelector(state => state.auth.isAdmin);

    const location = useLocation();
    const title = getTitleForPath(location.pathname);

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };

    return (
        <header className="header">
            <nav className="nav">
                <a href="#" onClick={toggleMenu}>
                    <img className="nav__icon nav__icon-menu" src={Menu} alt="" />
                </a>
                <Link className="logo" to={"/"} title={"Retour à l'accueil"}>
                    <img src={Logo} alt="Necroland"/>
                </Link>
                <div className={`nav__links ${menuVisible ? '' : 'hidden'}`}>
                    <Link className="nav__links_item" to={"attractions"}>Les attractions</Link>
                    <Link className="nav__links_item" to={"le-parc"}>Le parc</Link>
                    <Link className="nav__links_item" to={"infos-pratiques"}>Infos pratiques</Link>
                    
                    <Link className="nav__links_item" to={"contact"}>Contact</Link>
                    <Link className="nav__links_item" to={"reservation"}>Réservation</Link>
                    {isAdmin && <Link className="nav__links_item" to={"gestion-admin"}>Admin</Link>}
                </div>
                <div>
                    {isAuthenticated ? (
                        <Link className="nav__links_item" to={"profil"}>
                            <img className="nav__icon" src={Avatar} alt="" />
                        </Link>
                    ) : (
                        <Link className="nav__links_item" to={"connexion"}>
                            <img className="nav__icon" src={Avatar} alt="" />
                        </Link>
                    )}
                    {isAuthenticated && <LogoutButton />}
                </div>
            </nav>
            <div className="banner">
                <img src={Banner} alt="" />
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
      case '/cgv':
        return "Conditions générales de vente";
      case '/mentions-legales':
        return "Mentions légales";
      case '/plan-du-site':
        return "Plan du site";
      case '/le-parc':
        return "Le parc";
      case '/erreur':
        return "Erreur";
      case '/gestion-admin':
        return "Gestion administrateur";
      default:
        return "Necroland";
    }
}

export default Header;