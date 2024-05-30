import express from 'express';
import messagesController from './controllers/messagesController.js';
import reservationsController from './controllers/reservationsController.js';
import pricesController from './controllers/pricesController.js';
import authController from './controllers/authController.js';
import mainController from './controllers/mainController.js';
import userController from './controllers/usersController.js';
import isAuthenticated from './middlewares/isAuthenticated.js';
import isAdmin from './middlewares/isAdmin.js';

const router = express.Router();

router.get('/prices', pricesController.getPrices);
router.post('/price', isAuthenticated, isAdmin, pricesController.addPrice);
router.put('/price/:id', isAuthenticated, isAdmin, pricesController.updatePrice);

router.get('/messages', isAuthenticated, isAdmin, messagesController.getMessages);
router.post('/message', messagesController.addMessage);
router.patch('/message/:id', isAuthenticated, isAdmin, messagesController.changeStatusMessage);

router.get('/users', isAuthenticated, isAdmin, userController.getUsers);
router.get('/user/:id', isAuthenticated, userController.getOneUser);
router.post('/user', userController.addUser);
router.put('/user/:id', isAuthenticated, userController.updateUser);

router.get('/reservations', isAuthenticated, isAdmin, reservationsController.getReservations);
router.get('/reservations/:userId', isAuthenticated, reservationsController.getUserReservations);
router.post('/reservation', isAuthenticated, reservationsController.addReservation);
router.patch('/reservation/:id', isAuthenticated, reservationsController.changeStatusReservation);
router.patch('/reservation/update/:id', isAuthenticated, isAdmin, reservationsController.updateReservation);
router.delete('/reservation/delete/:id', isAuthenticated, isAdmin, reservationsController.deleteReservation);

router.get('/roles', userController.getRoles);

router.get('/attractions', mainController.getAttractions);
router.get('/attractions/:category', mainController.getAttractionsByCategory);
router.get('/attractions/tags/:tag', mainController.getAttractionsByTag);
router.post('/attraction', isAuthenticated, isAdmin, mainController.addAttraction);
router.put('/attraction/:id', isAuthenticated, isAdmin, mainController.updateAttraction);

router.get('/tags', mainController.getTags);
router.post('/tag', isAuthenticated, isAdmin, mainController.addTag);
router.put('/tag/:id', isAuthenticated, isAdmin, mainController.updateTag);

router.get('/categories', mainController.getCategories);
router.post('/category', isAuthenticated, isAdmin, mainController.addCategory);
router.put('/category/:id', isAuthenticated, isAdmin, mainController.updateCategory);
router.delete('/category/delete/:id', isAuthenticated, isAdmin, mainController.deleteCategory);

router.get('/photos', mainController.getPhotos);

router.get('/status', mainController.getStatus);

router.post('/inscription', authController.register);
router.post('/connexion', authController.login);
router.post('/deconnexion', isAuthenticated, authController.logout);

export default router;