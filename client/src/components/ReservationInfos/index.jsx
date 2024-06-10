import { Button, Box, List, ListItem, Typography } from '@mui/material';
import formatDate from '../../utils/dateUtils.js';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HotelIcon from '@mui/icons-material/Hotel';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import EuroIcon from '@mui/icons-material/Euro';

const ReservationInfos = ({id, start_date, end_date, nb_people, hotel, total_price, status, handleCancel}) => {

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    // Calcul de la date limite d'annulation (jour de début - 9 jours)
    const cancelLimitDate = new Date(startDate);
    cancelLimitDate.setDate(cancelLimitDate.getDate() - 9);

    return (
    <Box sx={{ backgroundColor:"#00000070", borderRadius: "0.5rem", p:"1.5rem", my:"1rem", columnGap: "1rem", display: { xs: "block", sm: "flex"}, alignItems: "center"}}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "space-around", rowGap: "1rem"}}>
            <Typography>N° de réservation: {id} </Typography>
            <Typography>Statut: {status}</Typography>
        
            {status === "Confirmée" 
            && endDate >= Date.now() 
            && cancelLimitDate > Date.now()
            && <Button sx={{ alignSelf: "center"}} size="small" onClick={() => handleCancel(id)}>Annuler la réservation</Button>}
        </Box>
        
        <Box sx={{ pt:2, mx: "auto" }}>
            <Typography>Détails de la réservation :</Typography>
            <List sx={{ px: "0.5rem" }}>  
                <ListItem><CalendarMonthIcon />Du {formatDate(start_date)} au {formatDate(end_date)}</ListItem>
                <ListItem><EmojiPeopleIcon />Entrée au parc pour {nb_people} {nb_people >= 1 ? "personne" : "personnes"}</ListItem>
                <ListItem><HotelIcon />Hôtel {hotel === true ? "inclus" : "non inclus"}</ListItem>
                <ListItem><EuroIcon />Prix total: {total_price} €</ListItem>
            </List>  
        </Box>
        
    </Box>
    )  
}

export default ReservationInfos;