const validator = require('../helpers/validations');    //HELPER DE VALIDACIONES
const User = require('../models/User');

const controller = {

    //REGISTRO DE USUARIOS
    signup: async (req, res, next) => {
        const {name, surname, email, password} = req.body;
        const validation_name = await validator.name_user(name);
        const validation_surname = await validator.surname_user(surname);
        const validation_email = await validator.email_user(email);
        const validation_password = await validator.password_user(password);
        if(!validation_name && !validation_surname && !validation_email && !validation_password){   //SI TODOS LOS CAMPOS VALIDOS
            try{
                const user = new User({
                    name: name,
                    surname: surname,
                    email: email.toLowerCase(),
                    password: password,
                    image: null,
                    role: 'USER_ROLE'
                });
                const findUser = await User.findOne({email: user.email});   //SACAR EL USUARIO CON ESE EMAIL
                if(!findUser){      //VERIFICAR DUPLICIDAD DE CORREOS
                    user.password = await user.encryptPassword(user.password);  //ENCRIPTAR CONTRASEÑA
                    const userStore = await user.save();    //GUARDAR EN LA DB
                    return res.json({'user': userStore});
                }
                return res.status(400).json({'message': 'El correo ya esta registrado en otra cuenta'});
            }catch(error){
                console.log(error);
                return res.status(500).json({'message': 'Error en el servidor'});
            }
        }
        return res.status(400).json({'errors':{validation_name, validation_surname, validation_email, validation_password}});
    }

};

module.exports = controller;