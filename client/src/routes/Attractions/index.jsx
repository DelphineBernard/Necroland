import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore, { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css'; 
import { styled } from '@mui/system';
import Card from "../../components/Card";
import SearchForm from "../../components/SearchForm";
import CategoryTabs from "../../components/CategoryTabs";
import { Context } from "../../components/Context";
import API_URL from '../../config.js';
import { Typography, Box } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { PUBLIC_URL } from "../../config.js";

// Initialize Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination, EffectCoverflow]);

// Styled component for the heading
const CenteredHeading = styled('h2')(({ theme }) => ({
    textAlign: 'center',
    margin: '16px 0',
    paddingTop: '20px',
    fontFamily: "Rubik, sans-serif",
    fontWeight: 600,
    textTransform: "uppercase",
    fontSize: "1rem",
    letterSpacing: '0.4px',
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
}));

const Attractions = () => {
    // Get attractions from context and category from URL
    const { attractions, setAttractions } = useContext(Context);
    const { category } = useParams(); // Get category parameter from the URL
    const [activeSlide, setActiveSlide] = useState(null); // State for the active slide
    const swiperRef = useRef(null); // Reference to the Swiper instance

    // Fetch attractions data from the API
    const fetchAttractions = async () => {
        try {
            let response;
            // Fetch data based on the category
            category
                ? response = await fetch(`${API_URL}/attractions/${category}`)
                : response = await fetch(`${API_URL}/attractions`);
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };

    // Use useEffect to fetch attractions whenever the category changes
    useEffect(() => {
        fetchAttractions();
    }, [category]); // Dependency array to refetch when category changes

    // Handle slide click event
    const handleSlideClick = (index) => {
        if (index === activeSlide) {
            setActiveSlide(null); // Deselect the slide
            swiperRef.current.swiper.autoplay.start(); // Restart autoplay
        } else {
            setActiveSlide(index); // Set the clicked slide as active
            swiperRef.current.swiper.autoplay.stop(); // Stop autoplay
        }
    };

    const middleSlideIndex = Math.floor(attractions.length / 2); // Calculate the middle slide index

    return (
        <main>
            <Box sx={{ mx: 'auto', my: '2rem', maxWidth: '921px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#00000070", border: "1px solid #e57373", borderRadius: "0.5rem", pt: "0.5rem", px: "0.5rem" }}>
                <WarningAmberIcon sx={{ color: "#e57373" }} />
                <Typography sx={{ color: "#e57373", pb: "0.5rem" }} variant="body1">
                    Le parc est interdit aux moins de 16 ans
                </Typography>
            </Box>
            <div className="Filter">
                <CategoryTabs />
                <SearchForm />
            </div>
            <section>
                <CenteredHeading>Des attractions à couper le souffle</CenteredHeading>

                <Swiper
                    ref={swiperRef}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    initialSlide={middleSlideIndex}
                    loop={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    className="mySwiper"
                    breakpoints={{
                        320: {
                            slidesPerView: 1, // Mobile
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2, // Tablet
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3, // Desktop
                            spaceBetween: 40,
                        },
                    }}
                >
                    {attractions.map((attraction, index) => (
                        <SwiperSlide
                            key={attraction.id}
                            onClick={() => handleSlideClick(index)}
                            className={index === activeSlide ? "swiper-slide-active" : ""}
                            style={index === activeSlide ? { transform: 'scale(1.1)', zIndex: 999 } : {}}
                        >
                            <Card
                                name={attraction.name}
                                img={`${PUBLIC_URL}/${attraction.photos[0].name}`}
                                description={attraction.description}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </main>
    );
}

export default Attractions;