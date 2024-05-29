import User from "../models/User.js";
import Role from "../models/Role.js";

const usersController = {
    getUsers: async (req, res) => {
        const users = await User.findAll()
        res.json({users})
    },

    getOneUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            res.status(201).json({ user, message: "Informations du membre récupérées avec succès" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la récupération des informations du membre" });
        }
    },

    addUser: async (req, res) => {
        try {
            const data = req.body;
            const user = await User.create({
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.address,
                postal_code: data.postalCode,
                city: data.city,
                country: data.country,
                email: data.email,
                password: data.password,
                role_id: Number(data.role_id),
            })
            res.status(201).json({ message: "Membre créé avec succès" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la création du membre" });
        }
    },

    updateUser: async (req, res) => {
        
        try {
            const userId = req.params.id;
            const userDataToUpdate = { ...req.body };
            delete userDataToUpdate.id;
            const user = await User.update(userDataToUpdate, {
                where: { id: userId }
            });
            res.status(200).json({ message: "Modifications enregistrées" });
        } catch (error) {
            console.log("Erreur", error);
            res.status(500).json({ message: "Erreur lors de la mise à jour des informations du membre" });
        }
    },

    getRoles: async (req, res) => {
        const roles = await Role.findAll()
        res.json({roles})
    },
}

export default usersController;