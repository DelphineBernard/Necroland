import express from 'express';
import messagesController from './controllers/messagesController.js';
import reservationsController from './controllers/reservationsController.js';
import pricesController from './controllers/pricesController.js';
import authController from './controllers/authController.js';
import mainController from './controllers/mainController.js';
import userController from './controllers/usersController.js';

const router = express.Router();

router.get('/prices', pricesController.getPrices);
router.get('/messages', messagesController.getMessages);
router.get('/users', userController.getUsers);

router.get('/reservations', reservationsController.getReservations);
router.post('/reservation', reservationsController.addReservation);

router.get('/roles', userController.getRoles);

router.get('/attractions', mainController.getAttractions);
router.get('/attractions/:category', mainController.getAttractionsByCategory);
router.get('/attractions/tags/:tag', mainController.getAttractionsByTag);

router.get('/tags', mainController.getTags);
router.get('/categories', mainController.getCategories);
router.get('/photos', mainController.getPhotos);

router.post('/inscription', authController.register);
router.post('/connexion', authController.login);
router.post('/deconnexion', authController.logout);

export default router;