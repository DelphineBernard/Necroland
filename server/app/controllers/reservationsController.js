import { Reservation, Status } from "../models/index.js";
import Price from "../models/Price.js";

const reservationsController = {

    getReservations: async (req, res) => {
        try {
            const reservations = await Reservation.findAll();
            res.status(200).json({ reservations });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des réservation", error });
        }
    },

    getUserReservations: async (req, res) => {
        try {
            const userId = req.params.userId;
            const userReservations = await Reservation.findAll({
                where: { user_id: userId },
                include: { model: Status, as: 'reservationStatus', attributes: ['label'] },
            });
            res.status(200).json(userReservations);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des réservations du membre", error });
        }
    },

    addReservation: async (req, res) => {
        try {
            const data = req.body;

            const calculateTotalPrice = async (duration, hotelStr, nb_people) => {
                const hotelBool = Boolean(hotelStr === 'true');
                let total_price = await Price.findOne({ where: { duration: duration, hotel: hotelBool } });
                return total_price.price * parseInt(nb_people);
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

            res.status(201).json({ message: "Réservation confirmée" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur lors de la réservation", error });
        };
    },

    changeStatusReservation: async (req, res) => {
        try {
            const reservationId = req.params.id;
            const reservation = await Reservation.update(
                { status_id: 2 },
                { where: { id: reservationId } })
            res.status(200).json(reservation);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de l'annulation de la réservation", error });
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
                let total_price = await Price.findOne({ where: { duration: duration, hotel: hotelBool } });
                return total_price.price * parseInt(nb_people);
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
            res.status(500).json({ message: "Erreur lors de la mise à jour de la réservation", error });
        }
    },

    deleteReservation: async (req, res) => {
        try {
            const reservationId = req.params.id;
            await Reservation.destroy({
                where: {
                    id: reservationId
                }
            });
            res.status(200).json({ message: "Réservation supprimée avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de la réservation", error });
        }
    },
};

export default reservationsController;