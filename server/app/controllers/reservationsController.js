import Reservation from "../models/Reservation.js";

const reservationsController = {
    getReservations: async (req, res) => {
        const reservations = await Reservation.findAll();
        res.json({reservations});
    }
}

export default reservationsController;