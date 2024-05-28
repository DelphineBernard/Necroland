import formatDate from '../../utils/dateUtils.js';

const ReservationInfos = ({id, start_date, end_date, nb_people, hotel, total_price, status, handleCancel}) => {

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    // Calcul de la date limite d'annulation (jour de début - 9 jours)
    const cancelLimitDate = new Date(startDate);
    cancelLimitDate.setDate(cancelLimitDate.getDate() - 9);

    return (
    <div className='reservation'>
        <ul>
            <li className='reservation__item'>N° de réservation: {id} </li>
            <li className='reservation__item'>Date de début: {formatDate(start_date)}</li>
            <li className='reservation__item'>Date de fin: {formatDate(end_date)}</li>
            <li className='reservation__item'>Nombre de personnes: {nb_people}</li>
            <li className='reservation__item'>Hôtel: {hotel === true ? "Inclus" : "Non inclus"}</li>
            <li className='reservation__item'>Prix total: {total_price} €</li>
            <li className='reservation__item'>Statut: {status}</li>
        </ul>
        {status === "Confirmée" 
        && endDate >= Date.now() 
        && cancelLimitDate > Date.now()
        && <button onClick={() => handleCancel(id)}>Annuler la réservation</button>}  
    </div>
    )  
}

export default ReservationInfos;