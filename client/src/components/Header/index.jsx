import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

const Header = ({title}) => {
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

export default Header;