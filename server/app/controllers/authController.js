import jwt from 'jsonwebtoken';
import validator from 'validator';
import { User } from '../models/index.js';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const authController = {

    register: async (req, res) => {
        try {
            if (!validator.isEmail(req.body.email)) {
                throw new Error('Email invalide');
            }
            const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
            if (!validator.isStrongPassword(req.body.password, options)) {
                throw new Error('Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
            }
            const existingUser = await User.findOne({ where: {email: req.body.email}});
            if (existingUser) {
                throw new Error('L\'email est déjà utilisé');
            }
            const newUser = await User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                postal_code: req.body.postalCode,
                city: req.body.city,
                country: req.body.country,
                email: req.body.email,
                password: req.body.password,
            });
            const token = jwt.sign({
                userId: newUser.id, 
                userRoleId: newUser.role_id, 
            }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.status(201).json({ message: 'Inscription réussie', token });
        } catch (error) {
            res.status(500).json({ message:"Une erreur est survenue lors de l'inscription", error });
        }
    },

    login: async (req, res) => {
        try {
            if (!validator.isEmail(req.body.email)) {
                throw new Error('Email invalide');
            }
            const foundUser = await User.findOne({ where: {email: req.body.email}});

            if (foundUser) {
                const result = await bcrypt.compare(req.body.password, foundUser.password);

                if (result) {
                    const token = jwt.sign({
                        userId: foundUser.id, 
                        userRoleId: foundUser.role_id,
                    }, process.env.JWT_SECRET, { expiresIn: '24h' }); 
                    res.status(200).json({ message: 'Connexion réussie', token });
                } else {
                    throw new Error('Mauvais couple identifiant/mot de passe');
                }

            } else {
                throw new Error('Mauvais couple identifiant/mot de passe');
            }
        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue lors de la connexion", error });
        }
    },

    logout: (req, res) => {
        try {
            res.status(200).json({ message: 'Vous avez été déconnecté(e)'});
        } catch (error) {
            res.status(500).json({ message: "Une erreur est survenue lors de la déconnexion", error });
        } 

    }
}

export default authController;