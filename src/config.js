const multer = require('multer');
const path = require('path');

module.exports = {

    secret: '123456kkkk',        //LLAVE DEL JWT
    storageUsers: multer.diskStorage({      //CONFIGUACION DE SUBIDA DE IMAGENES PARA LOS USUARIOS
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname + '/uploads/users'))
        },
        filename: (req, file, cb) => {
            const extension = file.originalname.split(".");
            cb(null, file.fieldname + '-' + Date.now() + '.' + (extension[extension.length - 1]))
        } 
    })

};