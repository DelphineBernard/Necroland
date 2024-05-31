import { Link } from "react-router-dom";
import Facebook from "../../assets/icons/facebook.png";
import Instagram from "../../assets/icons/instagram.png";
import Tiktok from "../../assets/icons/tiktok.png";
import Twitter from "../../assets/icons/twitter.png";

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
                <a href="https://x.com/NecrolandPark" target="_blank"><img className="footer__social-networks__img" src={Twitter} alt="" /></a>
                <a href="https://www.facebook.com/profile.php?id=61560565133900" target="_blank"><img className="footer__social-networks__img" src={Facebook} alt="" /></a>
                <a href="https://www.instagram.com/necrolandpark" target="_blank"><img className="footer__social-networks__img" src={Instagram} alt="" /></a>
                <a href="https://www.tiktok.com/@necrolandpark" target="_blank"><img className="footer__social-networks__img" src={Tiktok} alt="" /></a>
            </div>
        </footer>
    )
}

export default Footer;