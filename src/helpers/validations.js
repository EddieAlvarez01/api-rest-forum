const validator = require('validator'); //VALIDADOR DE DATOS
const e = require('express');

module.exports = {

    //VALIDAR NOMBRE DE USUARIO
    name_user: async (name) => {
        const errorArray = [];
        if(validator.isEmpty(name, {ignore_whitespace: true})){
            errorArray.push('El nombre es requerido');
        }
        if(!validator.isAlphanumeric(name)){
            errorArray.push('El nombre no es alfanumerico');
        }
        if(errorArray.length == 0){
            return null;
        }
        return errorArray;
    },

    //VALIDAR APELLIDO
    surname_user: async(surname) => {
        const errorArray = [];
        if(validator.isEmpty(surname, {ignore_whitespace: true})){
            errorArray.push('El apellido es requerido');
        }
        if(!validator.isAlphanumeric(surname)){
            errorArray.push('El apellido debe ser alfanumerico');
        }
        if(errorArray.length == 0){
            return null;
        }
        return errorArray;
    },

    //VALIDAR CORREO DE UN USUARIO
    email_user: async(email) => {
        const errorArray = [];
        if(validator.isEmpty(email, {ignore_whitespace: true})){
            errorArray.push('El apellido es requerido');
        }
        if(!validator.isEmail(email)){
            errorArray.push('El formato del correo es inválido');
        }
        if(errorArray.length == 0){
            return null;
        }
        return errorArray;
    },

    //VALIDAR CONTRASEÑA DE UN USUARIO
    password_user: async(password) => {
        const errorArray = [];
        if(validator.isEmpty(password)){
            errorArray.push('El apellido es requerido');
        }
        if(errorArray.length == 0){
            return null;
        }
        return errorArray;
    }

};