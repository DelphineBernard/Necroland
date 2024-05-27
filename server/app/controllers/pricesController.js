import Price from "../models/Price.js";

const pricesController = {
    getPrices: async (req, res) => {
        const prices = await Price.findAll();
        res.json({prices});
    },

    addPrice: async (req, res) => {
        try {
            const data = req.body;
            const price = await Price.create({
                duration: data.duration,
                price: data.price,
                hotel: Boolean(data.hotel),
            })
            res.status(201).json({ message: "Prix ajouté avec succès" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de l'ajout du prix" });
        }
    },
}

export default pricesController;