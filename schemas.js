const Joi = require('joi')

const schemas = {
    tag: Joi.object({
        name: Joi.string().min(1).max(50).required()
    }),
    meetup: Joi.object({
        name: Joi.string().min(1).max(50).required(),
        description: Joi.string().min(1).max(65535).required(),
        place: Joi.string().min(1).max(50).required(),
        time: Joi.date().required(),
        tags: Joi.array().items(Joi.number()).allow(null)
    }),
    query:  Joi.object({
        id: Joi.number().min(1).required()  
    })
}

module.exports = schemas