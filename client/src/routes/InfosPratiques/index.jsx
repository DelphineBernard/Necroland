import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import {Typography, Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { styled } from '@mui/system';
import { red } from '@mui/material/colors';
import Alerte from "../../assets/icons/alerte.png";
import autobus from "../../assets/icons/autobus.png";
import train from "../../assets/icons/train.png";
import voiture from "../../assets/icons/voiture.png";
import fleche from "../../assets/icons/fleche.png";
import telephone from "../../assets/icons/telephone.png";
import logo from "../../assets/img/logo.png";
import rollercoaster from "../../assets/img/rollercoaster.png";
import API_URL from '../../config.js';

const AlertSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '10px',
  marginBottom: '30px',
  '@media (min-width: 640px)': {
    flexDirection: 'row',
  },
});

const PaperStyled = styled(Paper)({
  padding: '16px',
  backgroundColor: 'transparent', // Pas de fond
  color: '#fff', // Assure que le texte est lisible sur un fond sombre
  boxShadow: 'none', // Pas de contour
  width: '100%',
  margin: 'auto',
});

const LinkStyled = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
});

const BoxStyled = styled(Box)({
  padding: '16px',
});

const TableStyled = styled(TableContainer)({
    backgroundColor: 'transparent', // Pas de fond
    color: '#fff', // Assure que le texte est lisible sur un fond sombre
    boxShadow: 'none', // Pas de contour
    '@media (min-width: 768px)': {
      width: '80%',
      margin: 'auto',
    },
  });

const TableCellStyled = styled(TableCell)(({ theme }) => ({
    color: theme.palette.common.white,
    textAlign: 'center', // Centre le texte horizontalement
    verticalAlign: 'middle', // Centre le texte verticalement
    borderBottom: `0.5px solid ${red[400]}`,
   
  }));

  const ResponsiveContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'justify',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      padding: "30px 170px",
    },
    
  }));
  
  const GridContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(2),
    width: '100%',
    maxWidth: '60%',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)', // Deux colonnes pour les écrans plus larges
        maxWidth: '40%',
      },
  }));
  
  const ImageContainer = styled('img')({
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  });

  const MapContainerWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '300px', // Taille par défaut pour les petits écrans
    padding: '8px',
    [theme.breakpoints.up('sm')]: {
      height: '400px', // Taille pour les écrans moyens
      padding: '50px'
    },
    [theme.breakpoints.up('md')]: {
      height: '500px', // Taille pour les grands écrans
      padding: '20px 300px'
    },
  }));

  const SectionContainer = styled(Box)(({ theme }) => ({
    backgroundColor: 'var(--dark_gray)',
    color: 'white',
    padding: '8px', // Padding minimal pour mobile
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%', // Pour s'assurer qu'il prend toute la largeur de l'écran
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4), // Augmente le padding pour les écrans moyens et plus grands
    },
    [theme.breakpoints.between('md', 'lg')]: {
      padding: '8px',
      width: '100%', // Réduit le padding pour les écrans laptops (1024px)
    },
  }));
  
  
  const DirectionContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '16px 0',
    padding: theme.spacing(2),
    backgroundColor: 'var(--dark_gray)',
    borderRadius: '8px',
    border: 'solid 2px white',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  }));
  
  const IconContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    backgroundColor: '#d9d9d9',
    margin: '8px',
  });
  
  const IconStyled = styled('img')({
    width: '40px',
    height: '40px',
  });
  
  const TextContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    margin: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(1),
      fontSize: '1rem', // Taille de texte pour les grands écrans
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& > *': {
        fontSize: '0.75rem', // Taille de texte pour les petits et moyens écrans
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
      },
    },
  }));
  
  const TextWithIcon = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%', // S'assure que l'élément prend toute la largeur disponible
    marginBottom: '4px', // Espacement vertical entre les éléments en mobile et tablette
    '& img': {
      marginRight: '8px', // Espace entre l'icône et le texte
    },
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
      marginBottom: '0px', // Pas d'espacement vertical entre les éléments pour les grands écrans
    },
  }));  
  
  const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    margin: theme.spacing(1),
  }));

  const ContactContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
    },
  }));
  
  const ContactInfo = styled('a')(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'none',
    fontSize: '1rem',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.2rem',
    },
  }));

  const PhoneIconContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '20px',
    backgroundColor: '#d9d9d9',
    margin: '8px',
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px',
      borderRadius: '15px',
    },
  }));
  
  const PhoneIconStyled = styled('img')(({ theme }) => ({
    width: '30px',
    height: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '20px',
      height: '20px',
    },
  }));  

  const LogoImage = styled('img')({
    width: '60px', // Taille réduite pour l'image
    height: '60px', // Taille réduite pour l'image
  });
  
  const PopupContent = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    width: '150px', // Taille par défaut pour les petits écrans
    [theme.breakpoints.up('sm')]: {
      width: '200px', // Taille pour les écrans moyens
    },
    [theme.breakpoints.up('md')]: {
      width: '250px', // Taille pour les grands écrans
    },
  }));
  
  
  const PopupText = styled(Typography)({
    color: 'black', // Texte en noir
  });
  
  

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
      popup: "1 Rue des Frissons, 77170 La tombe",
    },
  ];

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
           <AlertSection>
                <img src={Alerte} alt="Alert icon" className="header__alert_icon" />
                <span className="header__alert_span">Le parc est interdit au moins de 16 ans</span>
            </AlertSection>

            <Typography variant="p" display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                p={2}>
                Pour satisfaire toutes vos envies de frayeur, nous sommes ouverts 7/7j de 9h00 à 18h00
            </Typography>

            <Box py={4} textAlign="center">
                <Typography variant="h2" gutterBottom>
                    Des tarifs tout aussi surprenants
                </Typography>
                 <Box mt={2} textAlign="center">
                    <Button variant="contained" color="primary">
                        <LinkStyled to="/reservation">Réserver</LinkStyled>
                    </Button>
                </Box>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <PaperStyled>
                            <Typography variant="h3">Sans hôtel</Typography>
                            <TableStyled>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCellStyled>Durée</TableCellStyled>
                                            <TableCellStyled>Prix</TableCellStyled>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pricesWithoutHotel.map(price => (
                                            <TableRow key={price.id}>
                                                <TableCellStyled>{price.duration} jour{price.duration > 1 ? 's' : ''}</TableCellStyled>
                                                <TableCellStyled>{price.price}€</TableCellStyled>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableStyled>
                        </PaperStyled>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PaperStyled>
                            <Typography variant="h3">Avec hôtel</Typography>
                            <TableStyled>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCellStyled>Durée</TableCellStyled>
                                            <TableCellStyled>Prix</TableCellStyled>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pricesWithHotel.map(price => (
                                            <TableRow key={price.id}>
                                                <TableCellStyled>{price.duration} jour{price.duration > 1 ? 's' : ''}</TableCellStyled>
                                                <TableCellStyled>{price.price}€</TableCellStyled>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableStyled>
                        </PaperStyled>
                    </Grid>
                </Grid>
                
            </Box>
            <section>
      <Typography id="hotel" variant="h2" textAlign="center" gutterBottom>
        Notre Hôtel
      </Typography>
      <ResponsiveContainer>
        <Box p={2}>
          <p>
            Nos chambres, conçues avec un souci du détail morbide, offrent un refuge confortable au milieu du chaos extérieur.
            Du mobilier lugubre aux lumières tamisées qui dansent avec les ombres, chaque élément vous plongera plus profondément
            dans notre univers fascinant.
          </p>
        </Box>
        <GridContainer p={2}>
          <ImageContainer src={rollercoaster} alt="Rollercoaster 1" />
          <ImageContainer src={rollercoaster} alt="Rollercoaster 2" />
          <ImageContainer src={rollercoaster} alt="Rollercoaster 3" />
          <ImageContainer src={rollercoaster} alt="Rollercoaster 4" />
        </GridContainer>
      </ResponsiveContainer>
    </section>

      <Typography id="itineraire"variant="h2" textAlign="center" gutterBottom>Venir au parc</Typography>

      <MapContainerWrapper>
        <MapContainer center={[48.38756, 3.08915]} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler />
          {markers.map(marker => (
            <Marker key={marker.geocode} position={marker.geocode} icon={customIcon}>
                <Popup>
                  <PopupContent>
                    <LogoImage src={logo} alt="logo" />
                    <PopupText variant="body1">{marker.popup}</PopupText>
                  </PopupContent>
                </Popup>
            </Marker>
          ))}
        </MapContainer>
      </MapContainerWrapper>

      <ContactContainer>
      <PhoneIconContainer>
        <PhoneIconStyled src={telephone} alt="icone telephone" />
      </PhoneIconContainer>
      <ContactInfo href="tel:+33123456789">01 23 45 67 89</ContactInfo>
    </ContactContainer>

      <SectionContainer>
  <Grid container spacing={4} justifyContent="center">
    <Grid item xs={12} md={8}>
      <Typography variant="h3" align="center" gutterBottom>
        Venir en Bus
      </Typography>
      <DirectionContainer>
        <IconContainer>
          <IconStyled src={autobus} alt="icone bus" />
        </IconContainer>
        <TextContainer>
          <TextWithIcon>
            <IconStyled src={fleche} alt="icone flèche de direction" />
            <Typography>De Paris, prendre la ligne de BUS 3202</Typography>
          </TextWithIcon>
          <TextWithIcon>
            <IconStyled src={fleche} alt="icone flèche de direction" />
            <Typography>Arrêt Mairie La Tombe</Typography>
          </TextWithIcon>
        </TextContainer>
        <ButtonContainer>
          <Button variant="contained" color="primary" href="https://me-deplacer.iledefrance-mobilites.fr/fiches-horaires/bus/line%3AIDFM%3AC01464/horaires?date=2024-05-17T07%3A19&direction=1&line&stopAreaId=stop_area%3AIDFM%3A61465&stopId=stop_point%3AIDFM%3A7104" target="_blank" rel="noopener noreferrer">
            Voir les horaires
          </Button>
        </ButtonContainer>
      </DirectionContainer>
    </Grid>

    <Grid item xs={12} md={8}>
      <Typography variant="h3" align="center" gutterBottom>
        Venir en train
      </Typography>
      <DirectionContainer>
        <IconContainer>
          <IconStyled src={train} alt="icone train" />
        </IconContainer>
        <TextContainer>
          <TextWithIcon>
            <IconStyled src={fleche} alt="icone flèche de direction" />
            <Typography>De Paris prendre le TER Gare de Lyon</Typography>
          </TextWithIcon>
          <TextWithIcon>
            <IconStyled src={fleche} alt="icone flèche de direction" />
            <Typography>Arrivée Gare SNCF de Montreaul</Typography>
          </TextWithIcon>
          <TextWithIcon>
            <IconStyled src={fleche} alt="icone flèche de direction" />
            <Typography>Prendre le Bus 3202</Typography>
          </TextWithIcon>
          <TextWithIcon>
            <IconStyled src={fleche} alt="icone flèche de direction" />
            <Typography>Arrêt Mairie La Tombe</Typography>
          </TextWithIcon>
        </TextContainer>
        <ButtonContainer>
          <Button variant="contained" color="primary" href="https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/offers?search=N4Ig9gTglg5lB2BJAJiAXCA8gYQKIA4B2QgVnzIEYQAacaOedEABQENoBnAAgHF2BTLskEAZAJ5hGtSLASIOAZQAuYAA7MANqwDG-dEogBXfrWEclCVhckomOAoQBs%2BAEwBmAAwuaIMxfhWUJJMALKSSvwQ-KyGPn6W1kiKKupauvpGJiCqrBwc-PAwkRzoANqgUKgYACwu-CT8AJwkjQC0JKzErdXVAGbarY0U1Y6txI29FKwARqye-Pg%2BrEXo8IYaGrTa7MgKhtMc2tDTkavrmyDbEMgASvxwkgAq9BCsALZnGwC%2BALqm-DkIEpDFEACJWPRoCiECgtdxeQguRyNWhQDiIN5vfjIKAQ0EA9jAqIZYy0VRRABuQUMHAAqhANEwAPQcQzIVrksAUgq6VqsDSqfgcVraMARVrs1gALxBLP4EoBaUiTIAFpBWFAoiUvkA" target="_blank" rel="noopener noreferrer">
            Voir les horaires
          </Button>
        </ButtonContainer>
      </DirectionContainer>
    </Grid>

    <Grid item xs={12} md={8}>
      <Typography variant="h3" align="center" gutterBottom>
        Venir en voiture
      </Typography>
      <DirectionContainer>
        <IconContainer>
          <IconStyled src={voiture} alt="icone voiture" />
        </IconContainer>
        <TextContainer>
          <TextWithIcon>
            <IconStyled src={fleche} alt="icone flèche de direction" />
            <Typography>De Paris, en direction de A4 à Charenton-le-Pont.</Typography>
          </TextWithIcon>
          <TextWithIcon>
            <IconStyled src={fleche} alt="icone flèche de direction" />
            <Typography>Prendre N104 et A5 en direction de Marolles-sur-Seine. Prendre la sortie 18</Typography>
          </TextWithIcon>
          <TextWithIcon>
            <IconStyled src={fleche} alt="icone flèche de direction" />
            <Typography>Suivre D411 en direction de La Tombe</Typography>
          </TextWithIcon>
          <TextWithIcon>
            <IconStyled src={fleche} alt="icone flèche de direction" />
            <Typography>Entrer dans La tombe.</Typography>
          </TextWithIcon>
        </TextContainer>
        <ButtonContainer>
          <Button variant="contained" color="primary" href="https://www.blablacar.fr/search-car-sharing" target="_blank" rel="noopener noreferrer">
            Covoiturage
          </Button>
        </ButtonContainer>
      </DirectionContainer>
    </Grid>
  </Grid>
</SectionContainer>
    </main>
  );
};
export default InfosPratiques;
