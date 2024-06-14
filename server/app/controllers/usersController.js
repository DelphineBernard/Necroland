import User from "../models/User.js";
import Role from "../models/Role.js";
import { Reservation } from "../models/index.js";

const usersController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
        }
    },

    getOneUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des informations du membre", error });
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
            });
            res.status(201).json({ message: "Membre créé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du membre", error });
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
            res.status(500).json({ message: "Erreur lors de la mise à jour des informations du membre", error });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            // Check if the user has any associated reservations
            const reservations = await Reservation.findAll({
                where: { user_id: id }
            });
            if (reservations.length > 0) {
                return res.status(400).json({ message: "L'utilisateur ne peut pas être supprimé car il est associé à des réservations" });
            }
            await User.destroy({
                where: { id: id }
            });
            res.status(200).json({ message: "Utilisateur supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
        }
    },

    removeAccount: async (req, res) => {
        try {
            const { id } = req.params;
            const { lastname, firstname, email, address } = req.body;
            const user = await User.findByPk(id);
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
                    id: id
                }
            });
            res.status(200).json({ message: "Compte supprimé avec succès" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du compte", error });
        }
    },

    getRoles: async (req, res) => {
        try {
            const roles = await Role.findAll();
            res.status(200).json({ roles });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des rôles", error });
        } 
    },
}

export default usersController;