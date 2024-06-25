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
        tags: Joi.array().items(Joi.string()).allow(null)
    }),
    query:  Joi.object({
        id: Joi.number().min(1).required()  
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).alphanum().required()
    }),
    register: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).alphanum().required(),
        roleId: Joi.number().integer().valid(1, 2).required(),
    }),
    meetupAllQuery: Joi.object({
        nameSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
        placeSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
        descriptionSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
        timeSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
        name: Joi.string().min(1).max(50).allow(null),
        description: Joi.string().min(1).allow(null),
        place: Joi.string().min(1).max(50).allow(null),
        time: Joi.date().allow(null),
        page: Joi.number().integer().min(1).allow(null),
        pageSize: Joi.when('page', {
            is: Joi.exist().not(null),
            then: Joi.number().integer().min(1).required(),
            otherwise: Joi.number().integer().min(1).allow(null)
        })
    })
}

module.exports = schemas