const express = require('express');     //FRAMEWORK

const app = express();

//MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//CARGAR RUTAS
app.use('/user', require('./routes/User')); //RUTAS DE USUARIO
app.use('/topic', require('./routes/Topic'));   //RUTAS DE LOS TOPICS


module.exports = app;