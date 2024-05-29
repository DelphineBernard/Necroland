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

    updatePrice: async (req, res) => {
        try {
            const priceId = req.params.id;
            const priceDataToUpdate = { ...req.body };
            delete priceDataToUpdate.id;
            const price = await Price.update(priceDataToUpdate, {
                where: { id: priceId }
            });
            res.status(200).json({ message: "Modifications enregistrées" });
        } catch (error) {
            console.log("Erreur", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour des informations du prix" });
        }
    },
}

export default pricesController;