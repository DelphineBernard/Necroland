import { Button, Box } from '@mui/material';
import formatDate from '../../utils/dateUtils.js';
import "./style.scss";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import EuroIcon from '@mui/icons-material/Euro';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const ReservationInfos = ({id, start_date, end_date, nb_people, hotel, total_price, status, handleCancel}) => {

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    // Calcul de la date limite d'annulation (jour de début - 9 jours)
    const cancelLimitDate = new Date(startDate);
    cancelLimitDate.setDate(cancelLimitDate.getDate() - 9);

    return (
    <Box className='reservation' sx= {{ backgroundColor:'black',  borderRadius: "0.5rem", p:"1rem", m:"1rem"}}>
        <ul>
            <li className='reservation__item'><TaskAltIcon /> N° de réservation: {id} </li>
            <li className='reservation__item'><CalendarMonthIcon />Du {formatDate(start_date)} au {formatDate(end_date)}</li>
            <li className='reservation__item'><EmojiPeopleIcon />Entrées au parc {nb_people} {nb_people >= 1 ? "personne" : "personnes"}</li>
            <li className='reservation__item'><HotelIcon />Hôtel {hotel === true ? "inclus" : "non inclus"}</li>
            <li className='reservation__item'><EuroIcon />Prix total: {total_price} €</li>
            <li className='reservation__item'>Statut: {status}</li>
        </ul>
        {status === "Confirmée" 
        && endDate >= Date.now() 
        && cancelLimitDate > Date.now()
        && <Button size="small" onClick={() => handleCancel(id)}>Annuler la réservation</Button>}  
    </Box>
    )  
}

export default ReservationInfos;