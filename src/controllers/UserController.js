const validator = require('../helpers/validations');    //HELPER DE VALIDACIONES
const User = require('../models/User');
const moment = require('moment');
const jwt = require('../helpers/jwt');


const controller = {

    //REGISTRO DE USUARIOS
    signup: async (req, res, next) => {
        const {name, surname, email, password} = req.body;
        const validation_name = await validator.name_user(name);
        const validation_surname = await validator.surname_user(surname);
        const validation_email = await validator.email_user(email);
        const validation_password = await validator.password_user(password);
        if(!validation_name && !validation_surname && !validation_email && !validation_password){   //SI TODOS LOS CAMPOS VALIDOS PROCEDEMOS A GUARDAR
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
    },

    //LOGIN DE USUARIOS
    signin: async (req, res, next) =>{
        const {email, password} = req.body;
        const validation_email = await validator.email_user(email);
        const validation_password = await validator.password_user(password);
        if(!validation_email && !validation_password){      //SI TODOS LOS CAMPOS SON VALIDOS SE PROCEDE
            try{
                const user = await User.findOne({email: email.toLowerCase()}).select('-_id -role -__v');    //SE BUSCA AL USUARIO
                if(user){       //SI ES NULL, EL CORREO ES INCORRECTO
                    if(await user.validatePassword(password, user.password)){   //VALIDAR CONTRASEÑA
                        
                        //SESION VALIDA SE GENERA EL TOKEN
                        const token = jwt.generateToken({sub: user._id, role: user.role, iat: moment().unix()}, 60 * 60 * 24 * 2);
                        
                        //LIMPIAR LA PASSWORD PARA QUE NO SE VAYA AL FRONT
                        user.password = undefined;

                        return res.json({user: user, token: token});
                    }
                }
                return res.status(400).json({message: 'Credenciales incorrectas'});
            }catch(err){
                console.log(err);
                return res.status(500).json({message: 'Error en el servidor'});
            }
        }
        return res.status(400).json({'errors': {validation_email, validation_password}});
    }

};

module.exports = controller;