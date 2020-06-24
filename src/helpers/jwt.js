const jwt = require('jsonwebtoken');    //JWT
const config = require('../config');

module.exports = {

    generateToken: (payload, exp) => {
        try{
            return  jwt.sign(payload, config.secret, {expiresIn: exp});
        }catch(error){
            console.log(error);
            return null;
        }
    }

};