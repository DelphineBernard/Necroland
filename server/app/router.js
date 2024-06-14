import express from 'express';
import messagesController from './controllers/messagesController.js';
import reservationsController from './controllers/reservationsController.js';
import pricesController from './controllers/pricesController.js';
import authController from './controllers/authController.js';
import mainController from './controllers/mainController.js';
import usersController from './controllers/usersController.js';
import attractionsController from './controllers/attractionsController.js';
import tagsController from './controllers/tagsController.js';
import categoriesController from './controllers/categoriesController.js';
import photosController from './controllers/photosController.js';
import isAuthenticated from './middlewares/isAuthenticated.js';
import isAdmin from './middlewares/isAdmin.js';

const router = express.Router();

router.get('/prices', pricesController.getPrices);
router.post('/prices', isAuthenticated, isAdmin, pricesController.addPrice);
router.put('/prices/:id', isAuthenticated, isAdmin, pricesController.updatePrice);
router.delete('/prices/:id', isAuthenticated, isAdmin, pricesController.deletePrice);

router.get('/messages', isAuthenticated, isAdmin, messagesController.getMessages);
router.post('/messages', messagesController.addMessage);
router.patch('/messages/:id', isAuthenticated, isAdmin, messagesController.changeStatusMessage);

router.get('/users', isAuthenticated, isAdmin, usersController.getUsers);
router.get('/users/:id', isAuthenticated, usersController.getOneUser);
router.get('/roles', usersController.getRoles);
router.post('/users', usersController.addUser);
router.put('/users/:id', isAuthenticated, usersController.updateUser);
router.patch('/users/:id', isAuthenticated, usersController.removeAccount);
router.delete('/users/:id', isAuthenticated, isAdmin, usersController.deleteUser);

router.get('/reservations', isAuthenticated, isAdmin, reservationsController.getReservations);
router.get('/reservations/:userId', isAuthenticated, reservationsController.getUserReservations);
router.post('/reservations', isAuthenticated, reservationsController.addReservation);
router.patch('/reservations/:id/status', isAuthenticated, reservationsController.changeStatusReservation);
router.patch('/reservations/:id', isAuthenticated, isAdmin, reservationsController.updateReservation);
router.delete('/reservations/:id', isAuthenticated, isAdmin, reservationsController.deleteReservation);

router.get('/attractions', attractionsController.getAttractions);
router.get('/attractions/categories/:category', attractionsController.getAttractionsByCategory);
router.get('/attractions/tags/:tag', attractionsController.getAttractionsByTag);
router.get('/attractions/:id/tags', attractionsController.getAttractionTags);
router.post('/attractions', isAuthenticated, isAdmin, attractionsController.addAttraction);
router.post('/attractions/:attractionId', isAuthenticated, isAdmin, attractionsController.addTagToAttraction);
router.put('/attractions/:id', isAuthenticated, isAdmin, attractionsController.updateAttraction);
router.delete('/attractions/:attractionId/tags/:tagId', isAuthenticated, isAdmin, attractionsController.removeTagFromAttraction);
router.delete('/attractions/:id', isAuthenticated, isAdmin, attractionsController.deleteAttraction);

router.get('/tags', tagsController.getTags);
router.post('/tags', isAuthenticated, isAdmin, tagsController.addTag);
router.put('/tags/:id', isAuthenticated, isAdmin, tagsController.updateTag);
router.delete('/tags/:id', isAuthenticated, isAdmin, tagsController.deleteTag);

router.get('/categories', categoriesController.getCategories);
router.post('/categories', isAuthenticated, isAdmin, categoriesController.addCategory);
router.put('/categories/:id', isAuthenticated, isAdmin, categoriesController.updateCategory);
router.delete('/categories/:id', isAuthenticated, isAdmin, categoriesController.deleteCategory);

router.get('/photos/:attractionId', photosController.getAttractionsPhotos);
router.post('/photos/:attractionId', isAuthenticated, isAdmin, photosController.addPhoto);
router.delete('/photos/:photoId', isAuthenticated, isAdmin, photosController.deletePhoto);

router.get('/status', mainController.getStatus);

router.post('/inscription', authController.register);
router.post('/connexion', authController.login);
router.post('/deconnexion', isAuthenticated, authController.logout);

export default router;