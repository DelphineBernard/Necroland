import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import Alerte from "../../assets/icons/alerte.png";
import autobus from "../../assets/icons/autobus.png";
import train from "../../assets/icons/train.png";
import voiture from "../../assets/icons/voiture.png";
import fleche from "../../assets/icons/fleche.png";
import telephone from "../../assets/icons/telephone.png";
import { Icon } from "leaflet";
import logo from "../../assets/img/logo.png";
import API_URL from '../../config.js';



const InfosPratiques = () => {
    // appel Api pour afficher le prix
    const [prices, setPrices] = useState([]);
    useEffect(() => {
        const fetchPrices = async () => {
            try {
                let url = `${API_URL}/prices`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPrices(data.prices);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchPrices();
    }, []);

    // différenciation du prix avec hôtel et sans hôtel
    const pricesWithHotel = prices.filter(price => price.hotel);
    const pricesWithoutHotel = prices.filter(price => !price.hotel);

    // Initialisation du marqueur 
    const markers = [
        {
            geocode: [48.38756, 3.08915], // définition de la position GPS du marqueur
            popup: "Necroland 1 Rue des Frissons, 77170 La tombe",
        },

    ]
    // Intégration de l'icone selon la position du marqueur
    const customIcon = new Icon({
        iconUrl: require("../../assets/icons/markerIcon.png"),
        iconSize: [38, 38] //définition de la taille de l'icone
    });
    // utilisation du hook 'useMapEvents' de 'react-leaflet' pour écouter sur la carte
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng; // au click sur la carte le gestionnaire extrait les coordonnées du clic 
                //et construit une URL Google Maps pour les directions en utilisant ces coordonnées
                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                window.open(googleMapsUrl, '_blank');// ouvre l'URL dans un nouvel onglet, redirigeant l'utilisateur vers Google Maps
            },
        });
        return null;
    };

    const { hash } = useLocation(); // Extraction de la propriété `hash` de l'objet location

    useEffect(() => {
        if (hash) { // Si hash est présent dans l'URL
            const element = document.querySelector(hash); // Rechercher l'élément correspondant au hash
            if (element) { // Si l'élément existe
                element.scrollIntoView({ behavior: 'smooth' });// Scroller vers l'élément avec une animation douce
            }
        }
    }, [hash]);// Exécuter cet effet chaque fois que le hash change

    return (
        <main>
            <div>
                <img src={Alerte} alt="Alert icon" className="header__alert_icon" />
                <span className="header__alert_span">Le parc est interdit au moins de 16 ans</span>
            </div>

            <p> Pour satisfaire toutes vos envies de frayeur, nous sommes ouverts 7/7j de 9h00 à 18h00</p>

            <section>
                <h2 id="tarifs"> Des tarifs tout aussi surprenants </h2>
                <div>
                    <article>
                        <h3>Sans hôtel</h3>
                        {pricesWithoutHotel.map(price => (
                            <div key={price.id}>
                                <li>Durée : {price.duration} jour{price.duration > 1 ? 's' : ''} Prix : {price.price}€</li>
                            </div>
                        ))}
                    </article>

                    <button>
                        <Link to="/reservation">Réserver</Link>
                    </button>

                    <article>
                        <h3>Avec hôtel</h3>
                        {pricesWithHotel.map(price => (
                            <div key={price.id}>
                                <li>Durée : {price.duration} jour{price.duration > 1 ? 's' : ''} Prix : {price.price}€</li>
                            </div>
                        ))}
                    </article>
                </div>
            </section>

            <section>
                <h2 id="hotel">Notre Hôtel</h2>
                <div>
                    <p>Nos chambres, conçues avec un souci du détail morbide,
                        offrent un refuge confortable au milieu du chaos extérieur.
                        Du mobilier lugubre aux lumières tamisées qui dansent avec les ombres,
                        chaque élément vous plongera plus profondément dans notre univers fascinant.</p>
                    <div>
                        <img src="" alt="" />
                        <        img src="" alt="" />
                        <img src="" alt="" />
                    </div>
                </div>

            </section>
            <h2 id="itineraire">Venir au parc</h2>

            <MapContainer center={[48.38756, 3.08915]} zoom={13} scrollWheelZoom={13}>// Initialise la carte avec les coordonnées spécifiés,
                un zoom sur la carte, en utilisant la molette de la souris
                <TileLayer //Ajoute les tuiles de la carte à partir d'OpenStreetMap, permettant ainsi d'afficher une carte visuelle.
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler /> Gestionnaire d'évènements pour gérer les clics sur la carte et rediriger vers Google Maps avec les coordonnées cliquées
                {markers.map(marker => (
                    <Marker position={marker.geocode} icon={customIcon}> Ajoute les marqueurs à la carte
                        <Popup>
                            <div> // affiche le logo avec nom et adresse de Necroland
                                <img src={logo} alt="logo" />
                                <strong>{marker.popup}</strong>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div>
                <img src={telephone} alt="icone telephone" />
                <a href="tel:+33123456789">01 23 45 67 89</a>
            </div>

            <section>
                <div>
                    <h3>Venir en Bus</h3>
                    <img src={autobus} alt="icone bus" />
                    <p>De Paris, prendre la  ligne de BUS 3202</p>
                    <img src={fleche} alt="icone flèche de direction" />
                    <p>Arrêt Mairie La Tombe, suivre nos panneaux et préparez-vous à frisonnez</p>
                    <button><a href="https://me-deplacer.iledefrance-mobilites.fr/fiches-horaires/bus/line%3AIDFM%3AC01464/horaires?date=2024-05-17T07%3A19&direction=1&line&stopAreaId=stop_area%3AIDFM%3A61465&stopId=stop_point%3AIDFM%3A7104" target="_blank" rel="noopener noreferrer">Voir les horaires</a></button>
                </div>

                <div>
                    <h3>Venir en train</h3>
                    <img src={train} alt="icone train" />
                    <p>De Paris prendre le TER Gare de Lyon</p>
                    <img src={fleche} alt="icone flèche de direction" />
                    <p>Arrivée Gare SNCF de Montreaul</p>
                    <img src={fleche} alt="icone flèche de direction" />
                    <p>Prendre le Bus 3202</p>
                    <img src={fleche} alt="icone flèche de direction" />
                    <p>Arrêt Mairie, suivre nos panneaux et préparez-vous à frisonnez</p>
                    <button><a href="https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/offers?search=N4Ig9gTglg5lB2BJAJiAXCA8gYQKIA4B2QgVnzIEYQAacaOedEABQENoBnAAgHF2BTLskEAZAJ5hGtSLASIOAZQAuYAA7MANqwDG-dEogBXfrWEclCVhckomOAoQBs%2BAEwBmAAwuaIMxfhWUJJMALKSSvwQ-KyGPn6W1kiKKupauvpGJiCqrBwc-PAwkRzoANqgUKgYACwu-CT8AJwkjQC0JKzErdXVAGbarY0U1Y6txI29FKwARqye-Pg%2BrEXo8IYaGrTa7MgKhtMc2tDTkavrmyDbEMgASvxwkgAq9BCsALZnGwC%2BALqm-DkIEpDFEACJWPRoCiECgtdxeQguRyNWhQDiIN5vfjIKAQ0EA9jAqIZYy0VRRABuQUMHAAqhANEwAPQcQzIVrksAUgq6VqsDSqfgcVraMARVrs1gALxBLP4EoBaUiTIAFpBWFAoiUvkA" target="_blank" rel="noopener noreferrer">Voir les horaires</a></button>
                </div>

                <div>
                    <h3>Venir en voiture</h3>
                    <img src={voiture} alt="icone voiture" />
                    <p>De Paris, prendre Quai de l'Hôtel de ville,
                        Quai Henri IV, Quai de la Rapée et Quai de Bercy en direction de A4 à Charenton-le-Pont. </p>
                    <img src={fleche} alt="icone flèche de direction" />
                    <p>Continuer sur A4. Prendre N104 et A5 en direction de RD 411/D411 à Marolles-sur-Seine.
                        Prendre la sortie 18-Marolles-sur-Seine et quitter A5</p>
                    <img src={fleche} alt="icone flèche de direction" />
                    <p>Suivre D411 en direction de D75 vers La Tombe</p>
                    <img src={fleche} alt="icone flèche de direction" />
                    <p>Entrer dans La tombe, suivre nos panneaux et préparez-vous à frisonnez.</p>
                    <button><a href="https://www.blablacar.fr/search-car-sharing " target="_blank" rel="noopener noreferrer">Covoiturage</a></button>
                </div>

            </section>

        </main>
    );
};
export default InfosPratiques;