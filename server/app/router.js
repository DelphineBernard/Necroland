import express from 'express';
// import { getAttractions, getTags, getPhotos, getCategories } from './controllers/mainController.js';
// import { getUsers, getRoles } from './controllers/usersController.js';
// import messagesController from './controllers/messagesController.js';
// import reservationsController from './controllers/reservationsController.js';
// import pricesController from './controllers/pricesController.js';
// import authController from './controllers/authController.js';

const router = express.Router();

router.get("/coucou", (req, res) => {
    res.json({message: "coucou"});
});

// router.get('/prices', pricesController);
// router.get('/messages', messagesController);
// router.get('/users', getUsers);
// router.get('/reservations', reservationsController);
// router.get('/roles', getRoles);
// router.get('/attractions', getAttractions);
// router.get('/tags', getTags);
// router.get('/categories', getCategories);
// router.get('/photos', getPhotos);

export default router;