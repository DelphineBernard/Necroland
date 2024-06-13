import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import rollercoaster from "../../assets/img/rollercoaster.webp";
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import API_URL from '../../config.js';
import { Box, Button, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import zombie from "../../assets/img/zombie.svg";
import zombieHand from "../../assets/img/zombie-hand.svg";
import grave from "../../assets/img/grave.svg";
import park from "../../assets/img/necroland-park.webp";

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Autoplay, Navigation, Pagination]);

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

    return (
        <main className="center">
            <Container component="section">
                
                <Typography sx={{ backgroundColor: 'white', color: "black", fontWeight: "bold", padding: '20px', marginBottom: '20px', borderRadius: '4px', marginBottom: "2rem" }}>
                    OUVERTURE DU PARC DANS 1 MOIS
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3rem", mt: "3rem"}}>
                    <Typography variant="h2">Bienvenue à Necroland !</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1.5rem"}}>
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
                        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1.5rem"}}>
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

            <Container component="section">
                <Typography variant="h2" sx={{ py: "3rem"}}>Des attractions aussi terrifiantes les unes que les autres</Typography>
                <Swiper
                    ref={swiperRef}
                    spaceBetween={50}
                    slidesPerView={1}
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
                        },
                        640: {
                            slidesPerView: 1, // Tablette
                        },
                        1024: {
                            slidesPerView: 1, // Desktop
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
                            <Box className="card-content">
                                <img src={rollercoaster} alt={attraction.name} />
                                <Typography variant="span">{attraction.name}</Typography>
                                
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
            </Container>

            <Box sx={{ minWidth: "50%", display: "flex", alignItems: "center", justifyContent: "space-evenly", columnGap: "2rem", backgroundColor: "#00000070", borderRadius: "0.5rem", p: "1rem"}}>
                <Box>
                    <Typography>Tarifs</Typography>
                    <Typography>À partir de {lowestPrice !== null ? `${lowestPrice}€` : '...'} par personne</Typography>
                </Box>
                <Button sx={{alignSelf: "center", my: "0.5rem"}} size="small">
                    <Link to={"/infos-pratiques"}>Tous les tarifs</Link>
                </Button>
            </Box>
                    
            <Card sx={{ width: {xs: "100%", sm: "80%", md: "65%"} , display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", rowGap: "1rem", backgroundColor: "#00000070", borderRadius: "0.5rem", pb: "1rem", m:"3rem"}}>
                <Box 
                    sx={{ 
                        overflow: 'hidden', 
                        borderRadius: '0.5rem', 
                        width: '100%'
                    }}>
                    <CardMedia 
                    sx={{ width: '100%', transition: 'transform 0.7s ease','&:hover': {
                        transform: 'scale(1.25)'}}}
                    component="img"
                    image={park} 
                    alt="Necroland Park entrance"/>
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
