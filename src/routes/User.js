const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/UserController');

//RUTA DE REGISTRO DE USUARIOS
router.post('/signup', UserController.signup);

//RUTA DE INICIO DE SESION
router.post('/signin', UserController.signin);

module.exports = router;
