import Modal from 'react-modal';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context/index.jsx';
import formatDate from '../../../utils/dateUtils.js';
import API_URL from '../../../config.js';

const EditReservationModal = ({ reservationId, isOpen, onRequestClose, initialValues, onClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(initialValues);
    const [totalPrice, setTotalPrice] = useState(initialValues.total_price);
    const [duration, setDuration] = useState(1);
    const [hotelSelected, setHotelSelected] = useState(initialValues.hotel);
    const [durationSelected, setDurationSelected] = useState(duration);
    const [nbPeopleSelected, setNbPeopleSelected] = useState(initialValues.nb_people);
    const [startDate, setStartDate] = useState(initialValues.start_date);
    const [endDate, setEndDate] = useState(initialValues.end_date);
    const { allPrices } = useContext(Context);

    const calculateDuration = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end - start + 1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDuration(diffDays);
        return diffDays;
    };

    const calculeTotalPrice = () => {
        try {
            const selectedPrice = allPrices.find(price => price.duration == durationSelected && String(price.hotel) === hotelSelected);
            if (selectedPrice) {
                setTotalPrice(selectedPrice.price * nbPeopleSelected);
            }
        } catch (error) {
            console.error("Erreur le prix n'a pas pu être calculé", error);
        }
    };

    const updateEndDate = () => {
        const fullStartDate = new Date(startDate);
        const fullEndDate = new Date(startDate);
        fullEndDate.setDate(fullStartDate.getDate() + parseInt(durationSelected) - 1);

        const shortOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formEndDate = formatDate(fullEndDate, shortOptions).split('/').reverse().join('-');
        setEndDate(formEndDate);
        setFormData({ ...formData, end_date: formEndDate });
    };

    const handleHotelChange = (event) => {
        const value = event.target.value;
        if (durationSelected < 2) {
            // Empêche de choisir avec hôtel si la durée du séjour sélectionnée est de 1 jour
            return;
        }
        setHotelSelected(value);
        setFormData({ ...formData, hotel: value });
    };

    const handleDurationChange = (event) => {
        const value = event.target.value;
        setDurationSelected(value);
        setDuration(parseInt(value));
        setFormData({ ...formData, duration: parseInt(value) });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'nb_people') {
            setNbPeopleSelected(parseInt(value));
        } else if (name === 'start_date') {
            setStartDate(value);
        }
    };
    
    useEffect(() => {
        setFormData(initialValues);
        const initialDuration = calculateDuration(initialValues.start_date, initialValues.end_date);
        setDuration(initialDuration);
        setDurationSelected(initialDuration);
        setNbPeopleSelected(initialValues.nb_people);
        calculeTotalPrice();
    }, [initialValues]);

    useEffect(() => {
        if (hotelSelected === "true" && durationSelected === "1") {
            setDurationSelected("2");
        }
        calculeTotalPrice();
    }, [hotelSelected]);

    useEffect(() => {
        calculeTotalPrice();
        if (startDate && durationSelected) {
            updateEndDate();
        }
    }, [durationSelected, startDate, nbPeopleSelected]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/reservation/update/${reservationId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage(result.message);
                setErrorMessage('');
                onClose();
            } else {
                setSuccessMessage('');
                setErrorMessage(result.message);
            }

        } catch (error) {
            console.error('Erreur:', error);
            console.log(formData)
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <form method="post" onSubmit={handleSubmit}>
                {successMessage && <p>{successMessage}</p>}
                {errorMessage && <p>{errorMessage}</p>}
                <p>Tous les champs sont obligatoires.</p>
                <div>
                    <label htmlFor="duration">Durée du séjour</label>
                    <select
                        name="duration"
                        id="duration"
                        value={durationSelected}
                        onChange={handleDurationChange}
                    >
                        {hotelSelected !== "true" && <option value="1">1 jour</option>}
                        <option value="2">2 jours</option>
                        <option value="3">3 jours</option>
                        <option value="4">4 jours</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="hotel">Hôtel</label>
                    <select
                        name="hotel"
                        id="hotel"
                        value={hotelSelected}
                        onChange={handleHotelChange}
                    >
                        {durationSelected !== "1" && <option value="true">Avec hôtel</option>}
                        <option value="false">Sans hôtel</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="nb_people">Nombre de personnes</label>
                    <input
                        type="number"
                        name="nb_people"
                        id="nb-people"
                        min={1}
                        value={nbPeopleSelected}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="start_date">Date de début</label>
                    <input 
                        type="date" 
                        name="start_date" 
                        value={startDate} 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label htmlFor="end_date">Date de fin</label>
                    <input 
                        type="date" 
                        name="end_date" 
                        value={endDate} 
                        readOnly 
                    />
                </div>
                <p>Prix total : {totalPrice} € TTC</p>
                <button type="submit">Modifier les informations</button>
            </form>
        </Modal>
    )
}

export default EditReservationModal;