const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/UserController');
const config = require('../config');
const multer = require('multer');
const upload = multer({storage: config.storageUsers});
const auth_midd = require('../middlewares/auth');       //MIDDLEWARE DE AUTENTICACION

//RUTA DE REGISTRO DE USUARIOS
router.post('/signup', UserController.signup);

//RUTA DE INICIO DE SESION
router.post('/signin', UserController.signin);

//RUTA DE ACTUALIZACION DE UN PERFIL
router.put('/update', auth_midd.auth, upload.single('image'), UserController.update);

module.exports = router;
