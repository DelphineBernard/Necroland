import { Reservation, Status } from "../models/index.js";
// import Reservation from "../models/Reservation.js";
import Price from "../models/Price.js";
// import Status from "../models/Status.js";

const reservationsController = {
    getReservations: async (req, res) => {
        const reservations = await Reservation.findAll();
        res.json({reservations});
    },

    getUserReservations: async (req, res) => {
        const userId = req.params.userId
        const userReservations = await Reservation.findAll({
            where: { user_id: userId },
            include: { model: Status, as: 'reservationStatus', attributes: ['label'] },
        });
        res.json(userReservations)
    },

    addReservation: async (req, res) => {
        try {
            const data = req.body
            // console.log('Request received:', req.body);

            const calculateTotalPrice = async (duration, hotelStr, nb_people) => {
                const hotelBool = Boolean(hotelStr === 'true');
                let total_price = await Price.findOne({ where: {duration: duration, hotel:hotelBool}})
                return total_price.price * parseInt(nb_people)
            }

            const reservation = await Reservation.create({
                start_date: data.start_date,
                end_date: data.end_date,
                nb_people: parseInt(data.nb_people),
                hotel: data.hotel,
                total_price: await calculateTotalPrice(data.duration, data.hotel, data.nb_people),
                duration: data.duration, 
                user_id: data.user_id
            });

            res.json({message: "Réservation confirmée."})
        }
        catch(error){
            console.log(error)
        };
    },

    changeStatusReservation: async (req, res) => {
        try {
            const reservationId = req.params.id
            const reservation = await Reservation.update( 
                {status_id: 2},
                {where: {id: reservationId}})
            res.json(reservation)
        } catch (error) {
            console.log(error)
        }
    },

    updateReservation: async (req, res) => {
        try {
            const reservationId = req.params.id;
            const reservationDataToUpdate = { ...req.body };

            const calculateDuration = (startDate, endDate) => {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const diffTime = end - start + 1;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays;
            };

            const duration = calculateDuration(reservationDataToUpdate.start_date, reservationDataToUpdate.end_date);

            const calculateTotalPrice = async (duration, hotelStr, nb_people) => {
                const hotelBool = Boolean(hotelStr === 'true');
                let total_price = await Price.findOne({ where: { duration: duration, hotel: hotelBool }})
                return total_price.price * parseInt(nb_people)
            }

            const totalPrice = await calculateTotalPrice(duration, reservationDataToUpdate.hotel, reservationDataToUpdate.nb_people);

            const reservation = await Reservation.update({
                start_date: reservationDataToUpdate.start_date,
                end_date: reservationDataToUpdate.end_date,
                nb_people: parseInt(reservationDataToUpdate.nb_people),
                hotel: reservationDataToUpdate.hotel,
                total_price: totalPrice,
            }, {
                where: { id: reservationId }
            });
            res.status(200).json({ message: "Modifications enregistrées" });
        } catch (error) {
            console.log("Erreur", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de la réservation" });
        }
    },
};

export default reservationsController;