const Topic = require('../models/Topic');
const validator = require('../helpers/validations');

const controller = {

    //CREAR UN NUEVO TOPIC
    create: async (req, res) => {
        const {title, content, code, lang } = req.body;
        const validate_title = await validator.title_topic(title);
    }

};

module.exports = controller;