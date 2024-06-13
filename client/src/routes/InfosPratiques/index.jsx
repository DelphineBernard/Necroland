import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Typography, Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { red } from '@mui/material/colors';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import DirectionsBusRoundedIcon from '@mui/icons-material/DirectionsBusRounded';
import TrainRoundedIcon from '@mui/icons-material/TrainRounded';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { Icon } from "leaflet";
import logo from "../../assets/img/logo.webp";
import API_URL from '../../config.js';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import hotelOne from "../../assets/img/hotel-1.webp";
import hotelTwo from "../../assets/img/hotel-2.webp";
import hotelThree from "../../assets/img/hotel-3.webp";
import hotelFour from "../../assets/img/hotel-4.webp";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


SwiperCore.use([Pagination]);

const CustomTypographyH2 = styled(Typography)(({ theme }) => ({
  fontFamily: 'Cinzel, serif',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}));
const PaperStyled = styled(Paper)({
  padding: '16px',
  backgroundColor: 'transparent',
  color: '#fff',
  boxShadow: 'none',
  margin: 'auto',
  '@media (min-width: 768px)': {
    width: '100%',
  },
});
const LinkStyled = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
});
const TableStyled = styled(TableContainer)({
  backgroundColor: 'transparent',
  color: '#fff',
  boxShadow: 'none',
});
const TableCellStyled = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  textAlign: 'center',
  verticalAlign: 'middle',
  borderBottom: `0.5px solid ${red[400]}`,
}));
const ResponsiveContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'justify',
  gap: theme.spacing(1),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    padding: "30px 80px",
  },
  [theme.breakpoints.up('lg')]: {
    padding: "60px", // Adjustment for very large screens
  },
}));
const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: theme.spacing(1), // Reduce spacing between images
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)', // "Two columns for larger screens"
    maxWidth: '50%',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '50%',
    marginLeft: '2px'
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '50%',
    marginLeft: '2px'
  },
}));
const ImageContainer = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  [theme.breakpoints.up('md')]: {
    paddingRight: '0px' 
  },
}));
const ResponsiveBox = styled(Box)(({ theme }) => ({
  padding: '16px', 
  width: 'auto',
  textAlign: 'justify',
  marginBottom: '0px', 
  hyphens: 'auto', // Enable hyphenation
  wordBreak: 'break-word', // Allow words to break
  overflowWrap: 'break-word', // Ensure words break to avoid overflow
  lineHeight: '1.6', 
  letterSpacing: '0.5px', 
  [theme.breakpoints.up('sm')]: {
    width: '60%', 
    padding: '16px', 
    lineHeight: '1.2', 
    letterSpacing: '0.2px', 
  },
  [theme.breakpoints.up('md')]: {
    width: '40%', 
    marginRight: '2px'
  },
  [theme.breakpoints.up('lg')]: {
    width: '25%', 
    marginRight: '2px'
  },
}));
const MapContainerWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '300px',
  padding: '8px',
  [theme.breakpoints.up('sm')]: {
    height: '500px',
    padding: '50px',
  },
  [theme.breakpoints.up('md')]: {
    height: '400px',
    padding: '20px 300px',
  },
}));
const ContactContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(2),
  padding: "3px",
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
}));
const ContactInfo = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  fontSize: '1rem',
  marginLeft: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.2rem',
  },
}));
const SectionContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'var(--dark_gray)',
  color: 'white',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.between('md', 'lg')]: {
    padding: '8px',
    width: '100%',
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
  backgroundColor: 'var(--dark_gray)',
  margin: '8px',
});
const ChevronIcon = styled(ChevronRightOutlinedIcon)(({ size }) => ({
  fontSize: size || '50px',
}));
const TextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flex: 1,
  margin: theme.spacing(1),
  '& > *': {
    margin: theme.spacing(1),
    fontSize: '1rem',
  },
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > *': {
      fontSize: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
  },
}));
const TextWithIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  marginBottom: '4px',
  '& img': {
    marginRight: '8px',
  },
  [theme.breakpoints.up('lg')]: {
    width: 'auto',
    marginBottom: '0px',
  },
}));
const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: theme.spacing(1),
}));
const LogoImage = styled('img')({
  width: '60px',
  height: '60px',
});
const PopupContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  width: '150px',
  [theme.breakpoints.up('sm')]: {
    width: '200px',
  },
  [theme.breakpoints.up('md')]: {
    width: '250px',
  },
}));
const PopupText = styled(Typography)({
  color: 'black',
});


const InfosPratiques = () => {
  // Define a state variable 'prices' and a function 'setPrices' to update it.
  const [prices, setPrices] = useState([]);
  
  // Get the current theme using useTheme hook from Material-UI.
  const theme = useTheme();
  
  // Check if the current screen size is mobile or tablet using useMediaQuery hook.
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

  // useEffect hook to fetch prices data from the server when the component mounts.
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Define the URL to fetch prices from.
        let url = `${API_URL}/prices`;
        
        // Make a request to the server.
        const response = await fetch(url);
        
        // Check if the response is ok.
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        // Parse the response JSON data.
        const data = await response.json();
        
        // Update the prices state with the data fetched from the server.
        setPrices(data.prices);
      } catch (error) {
        // Log any errors that occur during the fetch.
        console.error('Fetch error:', error);
      }
    };
    
    // Call the fetchPrices function.
    fetchPrices();
  }, []);

  // Filter prices that include a hotel.
  const pricesWithHotel = prices.filter(price => price.hotel);
  
  // Filter prices that do not include a hotel.
  const pricesWithoutHotel = prices.filter(price => !price.hotel);

  // Define a list of markers for a map.
  const markers = [
    {
      geocode: [48.38756, 3.08915], // Coordinates for the marker.
      popup: "1 Rue des Frissons, 77170 La Tombe", // Text to show when the marker is clicked.
    },
  ];

  // Create a custom icon for the map markers.
  const customIcon = new Icon({
    iconUrl: require("../../assets/icons/markerIcon.png"), // Path to the custom icon image.
    iconSize: [38, 38], // Size of the icon.
  });

  // Handle map click events.
  const MapClickHandler = () => {
    // useMapEvents hook to handle map events.
    useMapEvents({
      click(e) {
        // Get the latitude and longitude where the map was clicked.
        const { lat, lng } = e.latlng;
        
        // Create a Google Maps URL with the clicked location as the destination.
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        
        // Open the Google Maps URL in a new tab.
        window.open(googleMapsUrl, '_blank');
      },
    });
    return null; // This component does not render anything.
  };

  // Get the current URL hash.
  const { hash } = useLocation();

  // useEffect hook to scroll to the element with the ID matching the hash when the component mounts or hash changes.
  useEffect(() => {
    if (hash) {
      // Find the element with the ID matching the hash.
      const element = document.querySelector(hash);
      if (element) {
        // Scroll to the element smoothly.
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
  
  return (
    <main>
      <Box sx={{ mx: 'auto', my: '2rem', maxWidth: '921px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#00000070", border: "1px solid #e57373", borderRadius: "0.5rem", pt: "0.5rem", px: "0.5rem" }}>
        <WarningAmberIcon sx={{ color: "#e57373" }} />
        <Typography sx={{ color: "#e57373", pb: "0.5rem" }} variant="body1">
          Le parc est interdit aux moins de 16 ans
        </Typography>
      </Box>
      <Typography variant="p" display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        p={2}>
        Pour satisfaire toutes vos envies de frayeur, nous sommes ouverts 7/7j de 9h00 à 18h00
      </Typography>
      <Box py={4} textAlign="center">
        <CustomTypographyH2 variant="h2" gutterBottom padding='20px'>
          Des tarifs tout aussi surprenants
        </CustomTypographyH2>
        <Box mt={2} textAlign="center">
          <Button variant="contained" color="primary" padding="60px">
            <LinkStyled to="/reservation">Réserver</LinkStyled>
          </Button>
        </Box>
        <Grid container justifyContent="center" paddingTop='20px'>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
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
          </Grid>
        </Grid>
      </Box>
      <section>
        <CustomTypographyH2 id="hotel" variant="h2" textAlign="center" gutterBottom >
          Notre Hôtel
        </CustomTypographyH2>
        <ResponsiveContainer>
          <ResponsiveBox>
            <p>
              Nos chambres, conçues avec un souci du détail morbide, offrent un refuge confortable au milieu du chaos extérieur.
              Du mobilier lugubre aux lumières tamisées qui dansent avec les ombres, chaque élément vous plongera plus profondément
              dans notre univers fascinant.
            </p>
          </ResponsiveBox>
          {isMobileOrTablet ? (
            <Box width="100%"> {/* Assurez-vous que le conteneur parent prend toute la largeur */}
              <Swiper
                pagination={{ clickable: true }}
                style={{ width: '100%', paddingBottom: '16px' }} // Ajoute un padding en bas du swiper et prend toute la largeur
              >
                <SwiperSlide>
                  <ImageContainer src={hotelOne} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <ImageContainer src={hotelTwo} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <ImageContainer src={hotelThree} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <ImageContainer src={hotelFour} alt="" />
                </SwiperSlide>
                <div
                  className="swiper-pagination"
                  style={{ position: 'relative', bottom: '0', marginTop: '20px' }} // Positionne les points de pagination en dessous
                ></div>
              </Swiper>
            </Box>
          ) : (
            <GridContainer p={2}>
              <ImageContainer src={hotelOne} alt="" />
              <ImageContainer src={hotelTwo} alt="" />
              <ImageContainer src={hotelThree} alt="" />
              <ImageContainer src={hotelFour} alt="" />
            </GridContainer>
          )}
        </ResponsiveContainer>
      </section>
      <CustomTypographyH2 id="itineraire" variant="h2" textAlign="center" gutterBottom padding='15px'>Venir au parc</CustomTypographyH2>
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
          <LocalPhoneOutlinedIcon sx={{color: 'white'}} />
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
                <DirectionsBusRoundedIcon style={{ fontSize: 50 }} />
              </IconContainer>
              <TextContainer>
                <TextWithIcon>
                  <ChevronIcon  />
                  <Typography>De Paris, prendre la ligne de BUS 3202</Typography>
                </TextWithIcon>
                <TextWithIcon>
                  <ChevronIcon />
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
                <TrainRoundedIcon style={{ fontSize: 50 }} />
              </IconContainer>
              <TextContainer>
                <TextWithIcon>
                  <ChevronIcon />
                  <Typography>De Paris prendre le TER Gare de Lyon</Typography>
                </TextWithIcon>
                <TextWithIcon>
                  <ChevronIcon />
                  <Typography>Arrivée Gare SNCF de Montreaul</Typography>
                </TextWithIcon>
                <TextWithIcon>
                  <ChevronIcon />
                  <Typography>Prendre le Bus 3202</Typography>
                </TextWithIcon>
                <TextWithIcon>
                  <ChevronIcon />
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
                <DirectionsCarFilledRoundedIcon style={{ fontSize: 50 }}/>
              </IconContainer>
              <TextContainer>
                <TextWithIcon>
                  <ChevronIcon />
                  <Typography>De Paris, en direction de A4 à Charenton-le-Pont.</Typography>
                </TextWithIcon>
                <TextWithIcon>
                  <ChevronIcon />
                  <Typography>Prendre N104 et A5 en direction de Marolles-sur-Seine. Prendre la sortie 18</Typography>
                </TextWithIcon>
                <TextWithIcon>
                  <ChevronIcon />
                  <Typography>Suivre D411 en direction de La Tombe</Typography>
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