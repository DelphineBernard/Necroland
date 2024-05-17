import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import Alerte from "../../assets/icons/alerte.png";
import autobus from "../../assets/icons/autobus.png";
import train from "../../assets/icons/train.png";
import voiture from "../../assets/icons/voiture.png";
import fleche from "../../assets/icons/fleche.png";
import telephone from "../../assets/icons/telephone.png";
const InfosPratiques=() => {
            const [prices, setPrices]= useState([]);

            useEffect(() => {
                const fetchPrices = async () => {
                    try {
                        let url = "http://localhost:3000/api/prices";
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

            const pricesWithHotel = prices.filter(price => price.hotel);
            const pricesWithoutHotel = prices.filter(price => !price.hotel);

            return(
                <main>
                    <img src= {Alerte} alt="Alert icon" className="header__alert_icon" />
            <span className="header__alert_span">Le parc est interdit au moins de 16 ans</span>
            <p> Pour satisfaire toutes vos envies de frayeur, nous sommes ouverts 7/7j de 9h00 à 18h00</p>
            <h2> Des tarifs tout aussi surprenants </h2>
            <article>
            <h3>Sans hôtel</h3>
            {pricesWithoutHotel.map(price => (
                <div key={price.id}>
                    <li>Durée : {price.duration} jour{price.duration > 1 ? 's' : ''} Prix : {price.price}€</li>
                </div>
            ))}
           
            </article>
            <article>
            <h3>Avec hôtel</h3>
            {pricesWithHotel.map(price => (
                <div key={price.id}>
                    <li>Durée : {price.duration} jour{price.duration > 1 ? 's' : ''} Prix : {price.price}€</li>
                </div>
            ))}
            </article>
            <button>
            <Link to={"reservation"}>Réserver</Link>
            </button>
            <h2>Notre Hôtel</h2>
            <p>Nos chambres, conçues avec un souci du détail morbide, 
            offrent un refuge confortable au milieu du chaos extérieur. 
            Du mobilier lugubre aux lumières tamisées qui dansent avec les ombres, 
            chaque élément vous plongera plus profondément dans notre univers fascinant.</p>
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <h2>Venir au parc</h2>
            <div id="map" style={{ height: '180px' }}>
            <MapContainer center={[48.3833, 3.0833]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             />

            </MapContainer>
            </div>
            
            <div>
                <address>La tombe, Saine et marne</address>
                <img src={telephone} alt="icone telephone" />
                <a href="tel:+33123456789">01 23 45 67 89</a>
            </div>

            <section>

                 <div>
                <img src={autobus} alt="icone bus" />
                <p>Zombieland de Paris en bus, prendre la  ligne de BUS 3202</p>
                <img src={fleche} alt="icone flèche de direction" />
                <p>Arrêt Mairie</p>
                <button><a href="https://me-deplacer.iledefrance-mobilites.fr/fiches-horaires/bus/line%3AIDFM%3AC01464/horaires?date=2024-05-17T07%3A19&direction=1&line&stopAreaId=stop_area%3AIDFM%3A61465&stopId=stop_point%3AIDFM%3A7104" target="_blank" rel="noopener noreferrer">Voir les horaires</a></button>
                <img src={train} alt="icone train" />
                </div>

                <div>
                <p>Zombieland de Paris  en train prendre le TER Gare de Lyon</p>
                <img src={fleche} alt="icone flèche de direction" />
                <p>Arrivée Gare SNCF de Montreaul</p>
                <img src={fleche} alt="icone flèche de direction" />
                <p>Prendre le Bus 3202</p>
                <img src={fleche} alt="icone flèche de direction" />
                <p>Arrêt Mairie</p>
                <button><a href="https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/offers?search=N4Ig9gTglg5lB2BJAJiAXCA8gYQKIA4B2QgVnzIEYQAacaOedEABQENoBnAAgHF2BTLskEAZAJ5hGtSLASIOAZQAuYAA7MANqwDG-dEogBXfrWEclCVhckomOAoQBs%2BAEwBmAAwuaIMxfhWUJJMALKSSvwQ-KyGPn6W1kiKKupauvpGJiCqrBwc-PAwkRzoANqgUKgYACwu-CT8AJwkjQC0JKzErdXVAGbarY0U1Y6txI29FKwARqye-Pg%2BrEXo8IYaGrTa7MgKhtMc2tDTkavrmyDbEMgASvxwkgAq9BCsALZnGwC%2BALqm-DkIEpDFEACJWPRoCiECgtdxeQguRyNWhQDiIN5vfjIKAQ0EA9jAqIZYy0VRRABuQUMHAAqhANEwAPQcQzIVrksAUgq6VqsDSqfgcVraMARVrs1gALxBLP4EoBaUiTIAFpBWFAoiUvkA" target="_blank" rel="noopener noreferrer">Voir les horaires</a></button>
                </div>

                <div>
                <img src={voiture} alt="icone voiture" />
                <p>Zombieland de paris  en voiture prendre l’autoroute A4 </p>
            <   img src={fleche} alt="icone flèche de direction" />
                <p>Suivre Autoroute A 86 vers Bobigny</p>
                <img src={fleche} alt="icone flèche de direction" />
                <p>Suivre l'Autoroute A5 vers Montereault</p>
                <img src={fleche} alt="icone flèche de direction" />
                <p>Prendre la sortie 18 vers La Tombe</p>
                <button><a href="https://www.blablacar.fr/search-car-sharing " target="_blank" rel="noopener noreferrer">Covoiturage</a></button>
                </div>
            
            </section>


             </main>
            );
};

export default InfosPratiques;