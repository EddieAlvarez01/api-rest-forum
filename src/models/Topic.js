const {Schema, model} = require('mongoose');

//ESQUEMA PARA SUBDOCUMENTOS
const comment = require('./Comment');

const topicSchema = new Schema({
    title: String,
    content: String,
    code: String,
    lang: String,
    date: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref: 'User'},
    comments: [comment]
});

module.exports = model('Topic', topicSchema);