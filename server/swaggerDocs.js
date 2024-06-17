/**
 * @swagger
 * tags:
 *   name: Prices
 *   description: Gestion des prix
 */

/**
 * @swagger
 * /prices:
 *   get:
 *     summary: Obtenir la liste des prix
 *     tags: [Prices]
 *     responses:
 *       200:
 *         description: Liste des prix récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       duration:
 *                         type: integer
 *                       price:
 *                         type: decimal
 *                       hotel:
 *                         type: boolean
 */
const pricesRoutes = `
/**
 * @swagger
 * /prices:
 *   post:
 *     summary: Ajouter un nouveau prix
 *     tags: [Prices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               duration:
 *                 type: string
 *                 example: "3 days"
 *               price:
 *                 type: number
 *                 example: 150
 *               hotel:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Prix ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Prix ajouté avec succès"
 */
router.post('/prices', isAuthenticated, isAdmin, pricesController.addPrice);

/**
 * @swagger
 * /prices/{id}:
 *   put:
 *     summary: Mettre à jour un prix
 *     tags: [Prices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du prix
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               duration:
 *                 type: string
 *                 example: "5 days"
 *               price:
 *                 type: number
 *                 example: 200
 *               hotel:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Prix mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Modifications enregistrées"
 */
router.put('/prices/:id', isAuthenticated, isAdmin, pricesController.updatePrice);

/**
 * @swagger
 * /prices/{id}:
 *   delete:
 *     summary: Supprimer un prix
 *     tags: [Prices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du prix
 *     responses:
 *       200:
 *         description: Prix supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Prix supprimé avec succès"
 */
router.delete('/prices/:id', isAuthenticated, isAdmin, pricesController.deletePrice);
`;

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Gestion des messages
 */

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Obtenir la liste des messages
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des messages récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       object:
 *                         type: string
 *                       content:
 *                         type: string
 *                       email:
 *                         type: string
 *                       lastname:
 *                         type: string
 *                       firstname:
 *                         type: string
 *                       status_id:
 *                         type: integer
 *                         description: "Status du message"
 */
const messagesRoutes = `
/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Envoyer un message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               object:
 *                 type: string
 *                 example: "Demande d'information"
 *               content:
 *                 type: string
 *                 example: "Pouvez-vous fournir plus de détails sur les prix ?"
 *               email:
 *                 type: string
 *                 example: "exemple@domaine.com"
 *               lastname:
 *                 type: string
 *                 example: "Dupont"
 *               firstname:
 *                 type: string
 *                 example: "Jean"
 *     responses:
 *       201:
 *         description: Message envoyé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message envoyé avec succès"
 */
router.post('/messages', messagesController.addMessage);

/**
 * @swagger
 * /messages/{id}:
 *   patch:
 *     summary: Changer le statut d'un message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du message
 *     responses:
 *       200:
 *         description: Statut du message mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Message classé"
 */
router.patch('/messages/:id', isAuthenticated, isAdmin, messagesController.changeStatusMessage);
`;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtenir la liste des utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       firstname:
 *                         type: string
 *                       lastname:
 *                         type: string
 *                       email:
 *                         type: string
 *                       address:
 *                         type: string
 *                       postal_code:
 *                         type: string
 *                       city:
 *                         type: string
 *                       country:
 *                         type: string
 *                       role_id:
 *                         type: integer
 */
const usersRoutes = `
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtenir les informations d'un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     address:
 *                       type: string
 *                     postal_code:
 *                       type: string
 *                     city:
 *                       type: string
 *                     country:
 *                       type: string
 *                     role_id:
 *                       type: integer
 */
router.get('/users/:id', isAuthenticated, usersController.getOneUser);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtenir la liste des rôles
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des rôles récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 */
router.get('/roles', usersController.getRoles);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Ajouter un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "Jean"
 *               lastname:
 *                 type: string
 *                 example: "Dupont"
 *               address:
 *                 type: string
 *                 example: "1 Rue de Paris"
 *               postal_code:
 *                 type: string
 *                 example: "75000"
 *               city:
 *                 type: string
 *                 example: "Paris"
 *               country:
 *                 type: string
 *                 example: "France"
 *               email:
 *                 type: string
 *                 example: "jean.dupont@example.com"
 *               password:
 *                 type: string
 *                 example: "motdepasse123"
 *               role_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Utilisateur ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Membre créé avec succès"
 */
router.post('/users', usersController.addUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "Jean"
 *               lastname:
 *                 type: string
 *                 example: "Dupont"
 *               address:
 *                 type: string
 *                 example: "1 Rue de Paris"
 *               postal_code:
 *                 type: string
 *                 example: "75000"
 *               city:
 *                 type: string
 *                 example: "Paris"
 *               country:
 *                 type: string
 *                 example: "France"
 *               email:
 *                 type: string
 *                 example: "jean.dupont@example.com"
 *               role_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Modifications enregistrées"
 */
router.put('/users/:id', isAuthenticated, usersController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur supprimé avec succès"
 *       400:
 *         description: Impossible de supprimer l'utilisateur en raison de réservations associées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'utilisateur ne peut pas être supprimé car il est associé à des réservations"
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 */
router.delete('/users/:id', isAuthenticated, isAdmin, usersController.deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Désactiver un compte utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lastname:
 *                 type: string
 *               firstname:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Compte désactivé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Compte supprimé avec succès"
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 */
router.patch('/users/:id', isAuthenticated, usersController.removeAccount);
`;

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Obtenir la liste des réservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des réservations récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reservations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       start_date:
 *                         type: string
 *                         format: date
 *                       end_date:
 *                         type: string
 *                         format: date
 *                       nb_people:
 *                         type: integer
 *                       hotel:
 *                         type: boolean
 *                       total_price:
 *                         type: number
 *                         format: float
 *                       user_id:
 *                         type: integer
 *                       duration:
 *                         type: integer
 */
const reservationsRoutes = `
/**
 * @swagger
 * /reservations/{userId}:
 *   get:
 *     summary: Obtenir les réservations d'un utilisateur spécifique
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Réservations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   start_date:
 *                     type: string
 *                     format: date
 *                   end_date:
 *                     type: string
 *                     format: date
 *                   nb_people:
 *                     type: integer
 *                   hotel:
 *                     type: boolean
 *                   total_price:
 *                     type: number
 *                     format: float
 *                   user_id:
 *                     type: integer
 *                   duration:
 *                     type: integer
 *                   reservationStatus:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 */
router.get('/reservations/:userId', isAuthenticated, reservationsController.getUserReservations);

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Ajouter une nouvelle réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-20"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-27"
 *               nb_people:
 *                 type: integer
 *                 example: 2
 *               hotel:
 *                 type: boolean
 *                 example: true
 *               duration:
 *                 type: integer
 *                 example: 7
 *               user_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Réservation confirmée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Réservation confirmée"
 */
router.post('/reservations', isAuthenticated, reservationsController.addReservation);

/**
 * @swagger
 * /reservations/{id}/status:
 *   patch:
 *     summary: Modifier le statut d'une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Statut de la réservation modifié avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Statut de la réservation mis à jour avec succès"
 */
router.patch('/reservations/:id/status', isAuthenticated, reservationsController.changeStatusReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   patch:
 *     summary: Mettre à jour une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-20"
 *               end_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-27"
 *               nb_people:
 *                 type: integer
 *                 example: 2
 *               hotel:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Réservation mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Modifications enregistrées"
 */
router.patch('/reservations/:id', isAuthenticated, isAdmin, reservationsController.updateReservation);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la réservation
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Réservation supprimée avec succès"
 */
router.delete('/reservations/:id', isAuthenticated, isAdmin, reservationsController.deleteReservation);
`

const attractionsRoutes = `
/**
 * @swagger
 * tags:
 *   name: Attractions
 *   description: Gestion des attractions
 */

/**
 * @swagger
 * /attractions:
 *   get:
 *     summary: Obtenir la liste des attractions
 *     tags: [Attractions]
 *     responses:
 *       200:
 *         description: Liste des attractions récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attractions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       category_id:
 *                         type: integer
 *                       photos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 */
router.get('/attractions', attractionsController.getAttractions);

/**
 * @swagger
 * /attractions/categories/{category}:
 *   get:
 *     summary: Obtenir les attractions par catégorie
 *     tags: [Attractions]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Catégorie des attractions
 *     responses:
 *       200:
 *         description: Attractions filtrées par catégorie récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attractions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       category_id:
 *                         type: integer
 *                       photos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 */
router.get('/attractions/categories/:category', attractionsController.getAttractionsByCategory);

/**
 * @swagger
 * /attractions/tags/{tag}:
 *   get:
 *     summary: Obtenir les attractions par tag
 *     tags: [Attractions]
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag des attractions
 *     responses:
 *       200:
 *         description: Attractions filtrées par tag récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attractions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       category_id:
 *                         type: integer
 *                       photos:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 */
router.get('/attractions/tags/:tag', attractionsController.getAttractionsByTag);

/**
 * @swagger
 * /attractions/{id}/tags:
 *   get:
 *     summary: Obtenir les tags d'une attraction
 *     tags: [Attractions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'attraction
 *     responses:
 *       200:
 *         description: Tags de l'attraction récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   label:
 *                     type: string
 */
router.get('/attractions/:id/tags', attractionsController.getAttractionTags);

/**
 * @swagger
 * /attractions:
 *   post:
 *     summary: Ajouter une nouvelle attraction
 *     tags: [Attractions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tour Eiffel"
 *               description:
 *                 type: string
 *                 example: "Une tour emblématique à Paris"
 *               category_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Attraction créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Attraction créée avec succès"
 */
router.post('/attractions', isAuthenticated, isAdmin, attractionsController.addAttraction);

/**
 * @swagger
 * /attractions/{attractionId}:
 *   post:
 *     summary: Ajouter un tag à une attraction
 *     tags: [Attractions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attractionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'attraction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tagId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Tag associé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tag associé avec succès"
 */
router.post('/attractions/:attractionId', isAuthenticated, isAdmin, attractionsController.addTagToAttraction);

/**
 * @swagger
 * /attractions/{id}:
 *   put:
 *     summary: Mettre à jour une attraction
 *     tags: [Attractions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'attraction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tour Eiffel"
 *               description:
 *                 type: string
 *                 example: "Une tour emblématique à Paris"
 *               category_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Attraction mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Modifications enregistrées"
 */
router.put('/attractions/:id', isAuthenticated, isAdmin, attractionsController.updateAttraction);

/**
 * @swagger
 * /attractions/{attractionId}/tags/{tagId}:
 *   delete:
 *     summary: Supprimer un tag d'une attraction
 *     tags: [Attractions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attractionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'attraction
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: Association tag/attraction supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Association tag/attraction supprimée avec succès"
 */
router.delete('/attractions/:attractionId/tags/:tagId', isAuthenticated, isAdmin, attractionsController.removeTagFromAttraction);

/**
 * @swagger
 * /attractions/{id}:
 *   delete:
 *     summary: Supprimer une attraction
 *     tags: [Attractions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'attraction
 *     responses:
 *       200:
 *         description: Attraction supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Attraction supprimée avec succès"
 */
router.delete('/attractions/:id', isAuthenticated, isAdmin, attractionsController.deleteAttraction);
`;

const tagsRoutes = `
/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Gestion des tags
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Obtenir la liste des tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Liste des tags récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       slug:
 *                         type: string
 */

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Ajouter un nouveau tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nature"
 *     responses:
 *       201:
 *         description: Tag ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tag ajouté avec succès"
 */

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Mettre à jour un tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Montagne"
 *     responses:
 *       200:
 *         description: Tag mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Modifications enregistrées"
 */

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Supprimer un tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du tag
 *     responses:
 *       200:
 *         description: Tag supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tag supprimé avec succès"
 */
`;

const categoriesRoutes = `
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestion des catégories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtenir la liste des catégories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       slug:
 *                         type: string
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Ajouter une nouvelle catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nature"
 *     responses:
 *       201:
 *         description: Catégorie ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Catégorie ajoutée avec succès"
 */

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Mettre à jour une catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la catégorie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Montagne"
 *     responses:
 *       200:
 *         description: Catégorie mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Modifications enregistrées"
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Supprimer une catégorie
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Catégorie supprimée avec succès"
 */
`;

const photosRoutes = `
/**
 * @swagger
 * tags:
 *   name: Photos
 *   description: Gestion des photos d'attractions
 */

/**
 * @swagger
 * /photos/{attractionId}:
 *   get:
 *     summary: Obtenir les photos d'une attraction
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: attractionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'attraction
 *     responses:
 *       200:
 *         description: Photos récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   attraction_id:
 *                     type: integer
 */

/**
 * @swagger
 * /photos/{attractionId}:
 *   post:
 *     summary: Ajouter une photo à une attraction
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attractionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'attraction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Photo de l'attraction"
 *     responses:
 *       201:
 *         description: Photo ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 attraction_id:
 *                   type: integer
 */

/**
 * @swagger
 * /photos/{photoId}:
 *   delete:
 *     summary: Supprimer une photo
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la photo
 *     responses:
 *       200:
 *         description: Photo supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Photo supprimée avec succès"
 */
`;

const statusRoute = `
/**
 * @swagger
 * tags:
 *   name: Status
 *   description: Gestion du statut de l'application
 */

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Obtenir la liste des statuts
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: Statut récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 */`

const authRoutes = `
 /**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Gestion de l'authentification utilisateur
 */

/**
 * @swagger
 * /inscription:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               address:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Inscription réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inscription réussie
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwidXNlclJvbGVJZCI6IjEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjI0MjYyMn0.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *       500:
 *         description: Erreur lors de l'inscription
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Une erreur est survenue lors de l'inscription
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */

router.post('/inscription', authController.register);

/**
 * @swagger
 * /connexion:
 *   post:
 *     summary: Connexion d'un utilisateur existant
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Connexion réussie
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwidXNlclJvbGVJZCI6IjEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjI0MjYyMn0.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *       500:
 *         description: Erreur lors de la connexion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Une erreur est survenue lors de la connexion
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */

router.post('/connexion', authController.login);

/**
 * @swagger
 * /deconnexion:
 *   post:
 *     summary: Déconnexion de l'utilisateur connecté
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vous avez été déconnecté(e)
 *       500:
 *         description: Erreur lors de la déconnexion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Une erreur est survenue lors de la déconnexion
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
 `

export {
    pricesRoutes,
    messagesRoutes,
    usersRoutes,
    reservationsRoutes,
    attractionsRoutes,
    tagsRoutes,
    categoriesRoutes,
    photosRoutes,
    statusRoute,
    authRoutes
};