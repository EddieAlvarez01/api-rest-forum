const Topic = require('../models/Topic');
const validator = require('../helpers/validations');
const config = require('../config');

const controller = {

    //CREAR UN NUEVO TOPIC
    create: async (req, res) => {
        const {title, content, code, lang } = req.body;
        const validate_title = await validator.title_topic(title);
        const validate_content = await validator.content_topic(content);
        const validate_lang = await validator.lang_topic(lang);

        //COMPROBAR SI SON VALIDOS (TRUE ES QUE SON INVALIDOS)
        if(validate_title || validate_content || validate_lang){ 
            return res.status(400).json({errors: {validate_title, validate_content, validate_lang}});
        }
        try{
            const {sub} = req.user;      //RECOGER ID DEL USUARIO EN SESION
            const topic = new Topic({
                title,
                content,
                code,
                lang,
                user: sub
            });
            const topicStore = await topic.save();
            return res.json({message: 'Topic creado correctamente', topic: topicStore});
        }catch(error){
            console.log(error);
            return res.status(500).json({message: 'Error en el servidor'});
        }

    },

    //SACAR TODOS LOS TOPICS
    getAll: async (req, res) => {
        try{
            //VER SI VIENE PAGINA, SINO DEVOLVER TODOS
            const {page} = req.params;
            let topics = null;
            if(page && page !== '0'){
                const option = await config.optionsTopics(5, page);
                topics = await Topic.paginate({}, option);
            }else{

                //DEVOLVER LOS TOPICS CON FINES DE ADMINISTRACION TODOS
                topics = await Topic.find().populate({path: 'user', select: '-password -__v -role'});
                return res.json({topics: topics});  
            }

            //DEVUELVE TOPICS PAGINADOS
            return res.json({topics: topics.docs, totalDocs: topics.totalDocs, totalPages: topics.totalPages, page: topics.page});
        }catch(error){
            console.log(error);
        }
        return res.status(500).json({message: 'Error en el servidor'});
    }

};

module.exports = controller;