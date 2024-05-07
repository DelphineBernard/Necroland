import { Link } from "react-router-dom";
import Facebook from "../../assets/icons/facebook.png";
import Instagram from "../../assets/icons/instagram.png";
import Tiktok from "../../assets/icons/tiktok.png";
import Twitter from "../../assets/icons/twitter.png";

const Footer = () => {
    return (
        <footer className="footer">
            <nav className="footer__nav">
                <ul className="footer__nav__links">
                    <li className="footer__nav__links_item"><Link to={"contact"}>Contact</Link></li>
                    <li className="footer__nav__links_item"><Link to={"cgv"}>CGV</Link></li>
                    <li className="footer__nav__links_item"><Link to={"mentions-legales"}>Mentions légales</Link></li>
                    <li className="footer__nav__links_item"><Link to={"plan-du-site"}>Plan du site</Link></li>
                </ul>
            </nav>
            <div className="social-networks">
                <a href="#"><img src={Twitter} alt="" /></a>
                <a href="#"><img src={Facebook} alt="" /></a>
                <a href="#"><img src={Instagram} alt="" /></a>
                <a href="#"><img src={Tiktok} alt="" /></a>
            </div>
        </footer>
    )
}

export default Footer;