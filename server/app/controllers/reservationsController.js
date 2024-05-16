// import { Reservation } from "../models/index.js";
import Reservation from "../models/Reservation.js";
import Price from "../models/Price.js";

const reservationsController = {
    getReservations: async (req, res) => {
        const reservations = await Reservation.findAll();
        res.json({reservations});
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

            res.json({ redirectTo: '/profil'})
        }
        catch(error){
            console.log(error)
        };
    },
};

export default reservationsController;