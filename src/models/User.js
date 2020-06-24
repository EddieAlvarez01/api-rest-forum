const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: String,
    surname: String,
    email: {type: String, unique: true},
    password: String,
    image: String,
    role: String
});

//METODO QUE ENCRYPTA CONTRASEÑA
userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = model('User', userSchema);
