const { Router } = require('express');
const router = Router();
const CommentController = require('../controllers/CommentController');
const authMiddelware = require('../middlewares/auth');

//RUTA DE AGREGAR COMENTARIO A UN TOPIC
router.post('/create/:id', authMiddelware.auth, CommentController.create);

//EDITAR UN COMENTARIO
router.put('/update/:idTopic/:idComment', authMiddelware.auth, CommentController.update);

module.exports = router;