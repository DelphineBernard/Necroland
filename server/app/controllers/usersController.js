import User from "../models/User.js";
import Role from "../models/Role.js";
import { Reservation } from "../models/index.js";

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

    deleteUser: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }

            // Vérifier si l'utilisateur a des réservations associées
            const reservations = await Reservation.findAll({
                where: { user_id: userId }
            });

            if (reservations.length > 0) {
                return res.status(400).json({ message: "L'utilisateur ne peut pas être supprimé car il est associé à des réservations" });
            }

            await User.destroy({
                where: { id: userId }
            });

            res.status(200).json({ message: "Utilisateur supprimé avec succès." });
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
            res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
        }
    },

    removeAccount: async (req, res) => {
        const { userId } = req.params;
        const { lastname, firstname, email, address } = req.body;

        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            await User.update({
                lastname: "Utilisateur supprimé",
                firstname: "Utilisateur supprimé",
                email: "Utilisateur supprimé",
                address: "Utilisateur supprimé"
            }, {
                where: {
                    id: userId
                }
            });
    
            res.status(200).json({ message: "Compte supprimé avec succès" });
        } catch (error) {
            console.error("Erreur lors de la suppression du compte :", error);
            res.status(500).json({ message: "Erreur lors de la suppression du compte" });
        }
    },

    getRoles: async (req, res) => {
        const roles = await Role.findAll()
        res.json({roles})
    },
}

export default usersController;