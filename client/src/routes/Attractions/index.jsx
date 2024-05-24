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


// Initialize Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination]);

const Attractions = () => {
    const { attractions, setAttractions } = useContext(Context);
    const { category } = useParams();

    const fetchAttractions = async () => {
        try {
            let response;
            category 
                ? response = await fetch(`http://localhost:3000/api/attractions/${category}`) 
                : response = await fetch(`http://localhost:3000/api/attractions`);
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAttractions();
    }, [category]);

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