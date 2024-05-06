import Price from "../models/Price.js";

const pricesController = {
    getPrices: async (req, res) => {
        const prices = await Price.findAll();
        res.json({prices});
    }
}

export default pricesController;