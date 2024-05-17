import jwt from 'jsonwebtoken';
import validator from 'validator';
import { User } from '../models/index.js';
import * as dotenv from 'dotenv';

dotenv.config();

const authController = {

    register: async (req, res) => {
        try {
            const options = { minLength: 12, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };
            if (!validator.isStrongPassword(req.body.password, options)) {
                throw new Error('Le mot de passe doit comporter au moins 12 caractères et au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial');
            }
            const newUser = await User.create(req.body);
            res.json({ redirectTo: '/profil'});
        } catch (error) {
            res.status(500).json({ alert: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const foundUser = await User.findOne({
                where: {email: req.body.email}
            });

            if (foundUser) {
                const result = await bcrypt.compare(req.body.password, foundUser.password);

                if (result) {
                    const jwtToken = jwt.sign({ userId: foundUser.id, userRoleId: foundUser.role_id  }, process.env.JWT_SECRET, { expiresIn: '24h' });
                    res.cookie('token', jwtToken, { httpOnly: true});
                    res.status(200).json({ token: jwtToken });
                } else {
                    res.status(401).json({ alert: 'Mauvais couple identifiant/mot de passe' });
                }

            } else {
                res.status(404).json({ alert: 'Mauvais couple identifiant/mot de passe' });
            }


        } catch (error) {
            res.status(500).json({ alert: error.message });
        }
    },

    logout: (req, res) => {
        res.cookie('token', '', { expires: new Date(0) });
        res.json({ message: 'Vous avez été déconnecté(e)'});
    }
}

export default authController;