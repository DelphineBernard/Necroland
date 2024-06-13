import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import API_URL from '../../config.js';
import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import zombie from "../../assets/img/zombie.svg";
import zombieHand from "../../assets/img/zombie-hand.svg";
import grave from "../../assets/img/grave.svg";
import park from "../../assets/img/necroland-park.webp";
import { PUBLIC_URL } from "../../config.js";

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';

SwiperCore.use([Autoplay, Navigation, Pagination, EffectCoverflow]);

const Accueil = () => {
    const [attractions, setAttractions] = useState([]);
    const [lowestPrice, setLowestPrice] = useState(null);
    const [activeSlide, setActiveSlide] = useState(null);  // Ajoute l'état pour le slide actif
    const swiperRef = useRef(null);  // Ajoute la référence pour Swiper

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

    const handleSlideClick = (index) => {
        if (index === activeSlide) {
            setActiveSlide(null);
            swiperRef.current.swiper.autoplay.start();
        } else {
            setActiveSlide(index);
            swiperRef.current.swiper.autoplay.stop();
        }
    };

    const middleSlideIndex = Math.floor(attractions.length / 2); // Dynamically calculate the middle slide index

    return (
        <main className="center">
            <Container component="section">

                <Typography sx={{ backgroundColor: 'white', color: "black", fontWeight: "bold", padding: '20px', marginBottom: '20px', borderRadius: '4px', marginBottom: "2rem" }}>
                    OUVERTURE DU PARC DANS 1 MOIS
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3rem", mt: "3rem" }}>
                    <Typography variant="h2">Bienvenue à Necroland !</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1.5rem" }}>
                            <Typography>Entrez dans un monde</Typography>
                            <Typography> où les morts ne dorment </Typography>
                            <Typography variant="spanItalic">jamais</Typography>
                        </Box>
                        <img className="text-illustration anim-translate" src={zombie} alt="" />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        <img className="text-illustration anim-appear" src={zombieHand} alt="" />
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1.5rem"}}>
                            <Typography>Préparez-vous à 
                                <Typography variant="spanItalic"> trembler</Typography>
                            </Typography>
                            <Typography> et à 
                                <Typography variant="spanItalic"> hurler</Typography> dans ce parc
                            </Typography>
                            <Typography> où le danger rôde</Typography>
                            <Typography> à chaque coin de rue.</Typography>
                        </Box>    
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1.5rem" }}>
                            <Typography>Etes-vous prêt à <Typography variant="spanItalic">survivre </Typography>
                                à...</Typography>
                        </Box>
                        <img className="text-illustration anim-fall" src={grave} alt="" />
                    </Box>

                    <Typography variant="spanUppercase">l' apocalypse zombie ?</Typography>

                    <Box sx={{ minWidth: "80%", alignSelf:"center", border: "1px solid #e57373", borderRadius: "0.5rem", pt: "0.5rem", px: "0.5rem"}}>
                        <WarningAmberIcon sx={{ color: "#e57373"}} />
                        <Typography sx={{ color: "#e57373", pb: "0.5rem"}} variant="body1">
                            Le parc est interdit aux moins de 16 ans
                        </Typography>
                    </Box>
                </Box>
            </Container>

            <Container component="section"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: "2px",
                }}
            >
                <Typography variant="h2" sx={{ py: "3rem" }}>Des attractions aussi terrifiantes les unes que les autres</Typography>
                <Swiper
                    ref={swiperRef}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="1"
                    initialSlide={middleSlideIndex}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    pagination={{ clickable: true }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                    
                >
                    {attractions.map((attraction, index) => (
                        <SwiperSlide
                            key={attraction.id}
                            onClick={() => handleSlideClick(index)}
                            className={index === activeSlide ? "swiper-slide-active" : ""}
                            style={index === activeSlide ? { transform: 'scale(1.1)', zIndex: 999 } : {}}
                        >
                            <Box className="card-content"
                                sx={{
                                    width: '100% !important',
                                    marginBottom: '3rem',
                                    backgroundColor: '#3f3f3f',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    alignContent: 'center',
                                    '@media (max-width:1920px)': {
                                        padding: '4rem',
                                        marginBottom: '5rem',
                                        width: '75% !important',
                                    },
                                    '@media (max-width:1280px)': {
                                        padding: '4rem',
                                        marginBottom: '5rem',
                                        width: '70% !important',
                                    },
                                    '@media (max-width:960px)': {
                                        padding: '1rem',
                                        marginBottom: '3rem',
                                        width: '100% !important',
                                    },
                                    '@media (max-width:600px)': {
                                        padding: '0.5rem',
                                        marginBottom: '3rem',
                                        width: '100% !important',
                                    },
                                }}
                            >
                                <Box component="img" src={`${PUBLIC_URL}/${attraction.photos[0].name}`} alt={attraction.name}
                                    sx={{
                                        width: '100%',
                                        display: 'block',
                                        position: 'relative',
                                    }} />

                                <Typography variant="h3"
                                    sx={{
                                        textAlign: 'center',
                                        fontSize: '1.2rem',
                                        padding: '0',
                                        '@media (max-width:1920px)': {
                                            fontSize: '2rem',
                                            marginTop: '30px',
                                        },
                                        '@media (max-width:1280px)': {
                                            fontSize: '2rem',
                                            marginTop: '30px',
                                        },
                                        '@media (max-width:960px)': {
                                            fontSize: '1.8rem',
                                            marginTop: '20px',
                                        },
                                        '@media (max-width:600px)': {
                                            fontSize: '1rem',
                                            marginTop: '16px',
                                        },
                                    }}>
                                    {attraction.name}</Typography>

                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </Container>

            <Box sx={{ minWidth: "50%", display: "flex", alignItems: "center", justifyContent: "space-evenly", columnGap: "2rem", backgroundColor: "#00000070", borderRadius: "0.5rem", p: "1rem" }}>
                <Box>
                    <Typography>Tarifs</Typography>
                    <Typography>À partir de {lowestPrice !== null ? `${lowestPrice}€` : '...'} par personne</Typography>
                </Box>
                <Button sx={{ alignSelf: "center", my: "0.5rem" }} size="small">
                    <Link to={"/infos-pratiques"}>Tous les tarifs</Link>
                </Button>
            </Box>

            <Card sx={{ width: { xs: "100%", sm: "80%", md: "65%" }, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", rowGap: "1rem", backgroundColor: "#00000070", borderRadius: "0.5rem", pb: "1rem", m: "3rem" }}>
                <Box
                    sx={{
                        overflow: 'hidden',
                        borderRadius: '0.5rem',
                        width: '100%'
                    }}>
                    <CardMedia
                        sx={{
                            width: '100%', transition: 'transform 0.7s ease', '&:hover': {
                                transform: 'scale(1.25)'
                            }
                        }}
                        component="img"
                        image={park}
                        alt="Necroland Park entrance" />
                </Box>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: "2rem" }}>
                    <Typography variant="body1">Si vous n'avez pas peur des défis qui vous attendent, aventurez-vous dans notre parc !</Typography>
                    <Button size="small"><Link to="/infos-pratiques#itineraire">Venir au parc</Link></Button>
                </CardContent>
            </Card>

        </main>
    );
}

export default Accueil;
