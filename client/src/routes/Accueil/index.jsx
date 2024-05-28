import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import rollercoaster from "../../assets/img/rollercoaster.png"
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import API_URL from '../../config.js';

const Accueil = () => {
    const [attractions, setAttractions] = useState([]);
    const [lowestPrice, setLowestPrice] = useState(null);

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const response = await fetch(`${API_URL}/attractions`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAttractions(data.attractions);
            } catch (error) {
                console.error("Error fetching attractions:", error);
            }
        };

        const fetchPrices = async () => {
            try {
                const response = await fetch(`${API_URL}/prices`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
            
                // Assurez-vous que data.prices est un tableau
                if (Array.isArray(data.prices)) {
                    const prices = data.prices.map(item => item.price);
                    const minPrice = Math.min(...prices);
                    setLowestPrice(minPrice);
                } else {
                    console.error("Data.prices is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        };
        fetchAttractions();
        fetchPrices();
    }, []);

    return (
        <main>
            <section>
                <h2>Ouverture du parc dans 1 mois</h2>
                <div>
                    <h3>Bienvenue à Necroland !</h3>
                    <div>
                        <p>Entrez dans un monde où les morts ne dorment <span>jamais</span>.</p>
                        <img src="" alt="" />
                    </div>
                    
                    <div>
                        <p>Préparez-vous à <span>trembler</span> et à <span>hurler</span> dans ce parc où le danger rôde à chaque coin de rue </p>
                        <img src="" alt="" />
                    </div>

                    <div>
                        <p>Etes-vous prêt à survivre à l'apocalypse zombie?</p>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <p>Tarifs</p>
                        <p>À partir de {lowestPrice !== null ? `${lowestPrice}€` : '...'} par personne</p>
                    </div>
                    <button>
                        <Link to={"/infos-pratiques"}>Tous les tarifs</Link>
                    </button>
                </div> 
            </section>
            <section>
                <h2>Des attractions aussi terrifiantes les unes que les autres</h2>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {attractions.map((attraction) => (
                        <SwiperSlide key={attraction.id}>
                           <div>
                           <img src={rollercoaster} alt={attraction.name} />
                           {attraction.name}
                           </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </main>
    );
}

export default Accueil;