import Plan from "../../assets/img/plan-du-parc.webp";
import Securite from "../../assets/img/securite.webp";
import Horreur from "../../assets/img/horreur-epique.webp";
import Spectacles from "../../assets/img/spectacles.webp";
import rollercoaster from "../../assets/img/rollercoaster.webp";
import { Grid, Card, CardMedia, CardContent, Typography, Box, Container, useMediaQuery } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const CardItem = ({ image, title, description, reverse }) => {
    const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const location = useLocation();
    // If an anchor (hash) is present in the URL, it searches for the matching element and scrolls the page to that element with smooth scrolling behavior
    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [location]);

    return (
        <Card sx={{ backgroundColor: '#222', color: '#fff', margin: '20px 0' }} component="article">
            <Grid container direction={isMdUp && reverse ? 'row-reverse' : 'row'}>
                <Grid item xs={12} md={6}>
                    <CardMedia
                        component="img"
                        height="100%"
                        image={image}
                        alt=""
                        sx={{
                            objectFit: 'cover', width: '100%', transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardContent>
                        <Typography variant="h3" component="h3" sx={{ fontFamily: 'Cinzel, serif', textAlign: 'center' }}>
                            {title}
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ marginTop: '10px', fontFamily: 'Roboto, sans-serif', textAlign: 'center' }}>
                            {description}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

const LeParc = () => {

    return (
        <main>
            <Container component="section" sx={{ textAlign: 'center' }}>
                <Typography paragraph sx={{ backgroundColor: 'white', color: "black", fontWeight: "bold", padding: '20px', marginBottom: '20px', borderRadius: '4px', marginBottom: "2rem" }}>
                    OUVERTURE DU PARC DANS 1 MOIS
                </Typography>
                <Typography variant="body1" paragraph id="presentation">
                    Necroland est bien plus qu'un simple parc d'attractions, c'est une expérience terrifiante, palpitante et mémorable qui plonge les visiteurs au coeur d'un univers post-apocalyptique où les zombies règnent en maîtres. Conçu pour les amateurs d'horreur, d'aventure et de frissons, NecroLand est un lieu où l'imagination rencontre la réalité, offrant une expérience unique en son genre pour tous ceux qui osent y pénétrer.
                </Typography>
                <Box sx={{ marginTop: "2rem"}}>
                    <WarningAmberIcon />
                    <Typography variant="body1" paragraph>
                        Le parc est interdit aux moins de 16 ans
                    </Typography>
                </Box>
            </Container>

            <Container component="section" sx={{ padding: "0" }}>
                <Typography variant="h2" component="h2" sx={{ fontFamily: 'Cinzel, serif', textAlign: 'center', marginBottom: "2rem" }}>
                    Franchissez les portes de Necroland pour une expérience inoubliable !
                </Typography>
                <CardItem
                    image={Horreur}
                    title="HORREUR ÉPIQUE"
                    description="Franchissez les portes de Necroland et vous serez transportés dans un monde en ruines, rempli d'ombres lugubres et de créatures en quête de chair fraîche. Prenez garde ! Chaque coin peut cacher un danger mortel."
                    reverse={false}
                />
                <CardItem
                    image={rollercoaster}
                    title="DES ATTRACTIONS À COUPER LE SOUFFLE"
                    description="Retrouvez notre gamme d'attractions et de manèges pour les amateurs de sensations fortes. Montez à bord de montagnes russes effrayantes qui traversent des cimetières hantés, affrontez des zombies dans des jeux interactifs et parcourez un labyrinthe terrifiant infesté de morts-vivants."
                    reverse={true}
                />
                <CardItem
                    image={Spectacles}
                    title="DES SPECTACLES ÉPOUSTOUFLANTS"
                    description="Nos spectacles en direct vous feront vivre des moments palpitants alors que des acteurs talentueux interagissent avec des zombies et des effets spéciaux à couper le souffle. Danse macabre, combats épiques et histoires sinistres vous tiendront en haleine tout au long de votre visite."
                    reverse={false}
                />
                <CardItem
                    image={Securite}
                    title="LA SÉCURITÉ AVANT TOUT"
                    description="La sécurité de nos visiteurs est notre priorité absolue. Une équipe de professionnels expérimentés veille à ce que chaque attraction soit sûre tout en offrant des sensations fortes."
                    reverse={true}
                />
            </Container>

            <Container id="plan-du-parc" component="section" sx={{ backgroundColor: '#000', color: '#fff', padding: "20px", borderRadius: '8px', boxShadow: 3, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ marginBottom: '20px', fontFamily: 'Cinzel, serif' }}>
                    PLAN DU PARC
                </Typography>
                <Box
                    component="img"
                    src={Plan}
                    alt="Plan du Parc"
                    sx={{
                        width: '100%',
                        borderRadius: '8px',
                        marginBottom: '20px',
                    }}
                />
                <Box sx={{ padding: '10px', display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
                    <Typography variant="body1" sx={{ color: '#FF0000', fontWeight: 'bold' }}>
                        1 <span style={{ color: '#fff' }} variant="body1">Feast of shadows</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#FF0000', fontWeight: 'bold' }}>
                        2 <span style={{ color: '#fff' }} variant="body1">Pink elegance bistro</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#FF0000', fontWeight: 'bold' }}>
                        3 <span style={{ color: '#fff' }} variant="body1">Dead Encounter</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#FF0000', fontWeight: 'bold' }}>
                        4 <span style={{ color: '#fff' }} variant="body1">Zombie parade</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#FF0000', fontWeight: 'bold' }}>
                        5 <span style={{ color: '#fff' }} variant="body1">Undead Plunge</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#FF0000', fontWeight: 'bold' }}>
                        6 <span style={{ color: '#fff' }} variant="body1">Zombie thrill</span>
                    </Typography>
                </Box>
            </Container>
        </main>
    )
}

export default LeParc;