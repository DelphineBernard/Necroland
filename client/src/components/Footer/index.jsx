import { Link } from "react-router-dom";
import Facebook from "../../assets/icons/facebook.webp";
import Instagram from "../../assets/icons/instagram.webp";
import Tiktok from "../../assets/icons/tiktok.webp";
import Twitter from "../../assets/icons/twitter.webp";

const Footer = () => {
    return (
        <footer className="footer">
            <nav className="footer__nav">
                <Link className="footer__nav__link" to={"contact"}>Contact</Link>
                <Link className="footer__nav__link" to={"cgv"}>CGV</Link>
                <Link className="footer__nav__link" to={"mentions-legales"}>Mentions légales</Link>
                <Link className="footer__nav__link" to={"plan-du-site"}>Plan du site</Link>
            </nav>
            <div className="footer__social-networks">
                <a href="https://x.com/NecrolandPark" target="_blank"><img className="footer__social-networks__img" src={Twitter} alt="Voir la page Twitter" /></a>
                <a href="https://www.facebook.com/profile.php?id=61560565133900" target="_blank"><img className="footer__social-networks__img" src={Facebook} alt="Voir la page Facebook" /></a>
                <a href="https://www.instagram.com/necrolandpark" target="_blank"><img className="footer__social-networks__img" src={Instagram} alt="Voir la page Instagram" /></a>
                <a href="https://www.tiktok.com/@necrolandpark" target="_blank"><img className="footer__social-networks__img" src={Tiktok} alt="Voir la page Tiktok" /></a>
            </div>
        </footer>
    )
}

export default Footer;