import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import Alerte from "../../assets/icons/alerte.png";
import Card from "../../components/Card";
import SearchForm from "../../components/SearchForm";
import CategoryTabs from "../../components/CategoryTabs";
import { Context } from "../../components/Context";
import API_URL from '../../config.js';


// Initialize Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination]);

const Attractions = () => {
    const { attractions, setAttractions } = useContext(Context);
    const { category } = useParams();// Récupère le paramètre de catégorie de l'URL

    const fetchAttractions = async () => {
        try {
            let response;
            category 
                ? response = await fetch(`${API_URL}/attractions/${category}`) 
                : response = await fetch(`${API_URL}/attractions`);
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };
     // Par défaut, au chargement de la page Attractions, j'affiche toutes les attractions
    useEffect(() => {
        fetchAttractions();
    }, [category]);// Re-fetch les attractions chaque fois que la catégorie change

    return (
        <main>
            <div>
                <img src={Alerte} alt="Alerte" />
                <p>Le parc est interdit au moins de 16 ans</p>
            </div>
            <div>
                <CategoryTabs />
                <SearchForm />
            </div>
            <section>
                <h2>Des attractions à couper le souffle</h2>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {attractions.map((attraction) => (
                        <SwiperSlide key={attraction.id}>
                            <Card
                                name={attraction.name}
                                //image={}
                                description={attraction.description}
                                // category={}
                                
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </main>
    );
}

export default Attractions;