import { Status } from "../models/index.js";

const mainController = {

    getStatus: async (req, res) => {
        try {
            const status = await Status.findAll();
            res.status(200).json({ status });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des status", error });
        } 
    },
}

export default mainController;