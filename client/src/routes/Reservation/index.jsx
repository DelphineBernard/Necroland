import { useEffect, useState, useContext } from "react";
import { Context } from '../../components/Context';
import { useSelector } from 'react-redux';
import formatDate from '../../utils/dateUtils.js';
import { useNavigate } from "react-router-dom";
import API_URL from '../../config.js';

const Reservation = () => {
    const [hotelSelected, setHotelSelected] = useState(null);
    const [durationSelected, setDurationSelected] = useState(null);
    const [nbPeopleSelected, setNbPeopleSelected] = useState(1);
    const [cgvChecked, setCgvChecked] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [stringStartDate, setStringStartDate] = useState(null);
    const [stringEndDate, setStringEndDate] = useState(null);

    // On récupère le tableau des tarifs de la BDD avec le contexte
    const { allPrices, setAllPrices } = useContext(Context);

    // Je récupère mon userId stocké dans le store
    const userId = useSelector((state) => state.auth.userId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrices = async () => {
            const response = await fetch(`${API_URL}/prices`);
            const data = await response.json();
            setAllPrices(data.prices);
        };
        fetchPrices();
    }, []);


    // Si on passe de "sans hôtel" à "avec hôtel" alors que le séjour sélectionnée est de 1 jour, on défini par défaut la durée de séjour à 2 jours (durée minimum)
    useEffect(() => {
        if (hotelSelected === "true" && durationSelected === "1"){
            setDurationSelected("2");
        }
    }, [hotelSelected]);

    useEffect(() => {
        calculeTotalPrice();
        if (startDate && durationSelected) {
            updateEndDate(startDate, durationSelected);
        }
    }, [hotelSelected, durationSelected, startDate]);

    // Fonction pour récupérer le bon tarif selon le choix de réservation (avec ou sans hôtel + durée du séjour)
    const calculeTotalPrice = () => {
        try {
            // Conversion de price.hotel(booleen dans la bdd) en string pour le comparer à hotelSelected (string)
            const selectedPrice = allPrices.find(price => price.duration == durationSelected && String(price.hotel) === hotelSelected)

            if (selectedPrice){
                setTotalPrice(selectedPrice.price)
            }
        } catch (error) {
            return "Erreur le prix n'a pas pu être calculé"
        } 
    }

    const handleHotelChange = (event) => {
        setHotelSelected(event.target.value)
    }

    const handleNbPeopleChange = (event) => {
        setNbPeopleSelected(event.target.value)
    }

    const handleDurationChange = (event) => {
        setDurationSelected(event.target.value)
    }

    const handleCheckboxChange = (event) => {
        setCgvChecked(event.target.checked);
    }

    const handleStartDateChange = (event) => {
        const startDate = event.target.value
        setStartDate(startDate);
    }

    const updateEndDate = () => {
        // On récupère les dates complètes avec la methode Date(), on récupère la date de fin à partir de la date de début pour lui ajouter le nombre de jours nécessaires dans un second temps
        const fullStartDate = new Date(startDate);
        const fullEndDate = new Date(startDate);

        // On ajoute à la date de fin la durée du séjour (durationSelected = string à transformer en int) - 1 jour (car sinon on obtient un jour de trop)
        fullEndDate.setDate(fullStartDate.getDate() + parseInt(durationSelected) -1);
        
        // Options permettant d'obtenir le format de date en string pour la partie sélection (jour de la semaine, date, mois, année)
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

        setStringStartDate(formatDate(fullStartDate, options));
        setStringEndDate(formatDate(fullEndDate, options));

        // On formate la date de fin pour l'intégrer dans le form (et on la transforme en format form soit YYYY-MM-JJ)
        const shortOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formEndDate = formatDate(fullEndDate, shortOptions).split('/').reverse().join('-')
        setEndDate(formEndDate);
    }

    const handleReservation = (event) => {
        if (!cgvChecked){
            event.preventDefault();
            alert("Veuillez accepter les conditions générales de vente pour confirmer votre réservation.");
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.target)
            const reservationData = Object.fromEntries(formData.entries());
            reservationData.user_id = userId

        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/reservation`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        if (response.ok) {
            navigate('/profil');
        } else {
            alert('Erreur lors de la réservation.');
        }
        } catch (error) {
            console.log(error)
        }
    };    

    return (
        <main>
        <h2>Choix des options</h2>
        <form method="post" onSubmit={handleSubmit}>
            <fieldset>
                <legend>Hôtel</legend>
                <div>
                    <input type="radio" name="hotel" id="true" value="true" onChange={handleHotelChange}/>
                    <label htmlFor="true">Avec hôtel</label>
                </div>
                <div>
                    <input type="radio" name="hotel" id="false" value="false" onChange={handleHotelChange}/>
                    <label htmlFor="false">Sans hôtel</label>
                </div>
            </fieldset> 

            <div>
                <label htmlFor="nb_people">Nombre de personnes</label>
                <input type="number" name="nb_people" min={1} defaultValue={1} onChange={handleNbPeopleChange}/>
            </div>

            <fieldset>
                <legend>Durée du séjour</legend>
                {/* La durée du séjour 1 jour est affichée uniquement si on ne prend pas d'hôtel (avec hôtel le séjour sera de 2 jours minimum) */}
                {hotelSelected !== "true" &&
                <div>
                    <input type="radio" name="duration" id="1" value="1" onChange={handleDurationChange}/>
                    <label htmlFor="1">1 jour</label>
                </div>
                }
                <div>
                    <input type="radio" name="duration" id="2" value="2" onChange={handleDurationChange}/>
                    <label htmlFor="2">2 jours</label>
                </div>
                <div>
                    <input type="radio" name="duration" id="3" value="3" onChange={handleDurationChange}/>
                    <label htmlFor="3">3 jours</label>
                </div>
                <div>
                    <input type="radio" name="duration" id="4" value="4" onChange={handleDurationChange}/>
                    <label htmlFor="4">4 jours</label>
                </div>
            </fieldset>
            
            <fieldset>
                <legend>Dates</legend>
                    <div>
                        <label htmlFor="start_date">Du</label>
                        <input type="date"  name="start_date" onChange={handleStartDateChange}/>
                        <label htmlFor="end_date">au</label>
                        <input type="date" name="end_date" value={endDate} readOnly />
                    </div>
            </fieldset>

            <h2>Votre sélection</h2>
            {/* Si l'hôtel et la durée ne sont pas sélectionnés */}
            {!hotelSelected && !durationSelected && <p>Choisissez vos options de séjour</p>}
            {/* Si l'hôtel ou la durée sont sélectionnés on affiche la sélection */}
            {(hotelSelected || durationSelected) &&
            <ul>
                <li>
                    {!stringStartDate && "Dates ?"}
                    {stringStartDate && stringEndDate && `Du ${stringStartDate} au ${stringEndDate}`}
                </li>
                <li>
                    {!hotelSelected && "Hôtel ?"}

                    {/* Si la durée du séjour n'est pas sélectionnée, on affiche juste "hôtel compris" */}
                    {hotelSelected && hotelSelected === "true" && "Hôtel compris" }

                    {/* Si la durée est sélectionnée, on affiche le nombre de nuits (1 jour de moins que la durée du séjour) */}
                    {/* La durée étant une string dans le form, on la transforme en nombre avec parseInt */}
                    {/* Pour l'affichage du "s" de nuit : si la durée du séjour est égale à 2 jours il n'y aura qu'une nuit, si supérieure à 2, il y aura plusieurs nuits. */}
                    {hotelSelected && hotelSelected === "true" && durationSelected && parseInt(durationSelected) >= 2 && ` pour ${durationSelected -1} ${parseInt(durationSelected) > 2 ? "nuits" : "nuit"}`}
                    {hotelSelected && hotelSelected === "false" && "Sans hôtel"}
                </li>
                <li>
                    {!durationSelected && "Durée du séjour ?"}
                    {durationSelected && `Parc ${durationSelected} ${parseInt(durationSelected) > 1 ? "jours" : "jour"}`}
                </li>
                <li>Nombre de personnes: {nbPeopleSelected}</li>
                <li>Prix total: {totalPrice * nbPeopleSelected} € TTC</li>
            </ul>}

            <div>
                <input type="checkbox" name="cgv" id="cgv" onChange={handleCheckboxChange} />
                <label htmlFor="cgv">J'accepte les conditions générales de vente.</label><a href="/cgv" target="_blank">Voir les CGV</a>
            </div>

            <button onClick={handleReservation}>Confirmer la réservation</button>
            
        </form>
    </main>
    )
}

export default Reservation;