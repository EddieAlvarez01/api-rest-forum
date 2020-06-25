const { Router } = require('express');
const router = Router();
const TopicController = require('../controllers/TopicController');
const authMiddleware = require('../middlewares/auth');      //MIDDLEWARE DE AUTENTICACION

//RUTA PARA CREAR UN TOPIC
router.post('/create', authMiddleware.auth, TopicController.create);

//RUTA PARA TRAER TODOS LOS TOPICS
router.get('/get-topics/:page?', TopicController.getAll);

module.exports = router;