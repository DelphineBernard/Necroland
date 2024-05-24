import formatDate from '../../utils/dateUtils.js';

const ReservationInfos = ({id, start_date, end_date, nb_people, hotel, total_price, status }) => {
    return (
    <>
        <ul>
            <li>N° de réservation: {id} </li>
            <li>Date de début: {formatDate(start_date)}</li>
            <li>Date de fin: {formatDate(end_date)}</li>
            <li>Nombre de personnes: {nb_people}</li>
            <li>Hôtel: {hotel === true ? "Inclus" : "Non inclus"}</li>
            <li>Prix total: {total_price} €</li>
            <li>Statut: {status}</li>
        </ul>
        {status === "Confirmée" && <button>Annuler la réservation</button>}  
    </>
    )  
}

export default ReservationInfos;