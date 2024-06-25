const TagService = require("../services/TagService")
const CreateTagDto = require("../dto/tag/CreateTagDto")
const UpdateTagDto = require("../dto/tag/CreateTagDto")

const {StatusCodes} = require('http-status-codes')

module.exports = {
    create: async (req, res) => {
        // #swagger.tags = ['Tag']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/CreateTag' }
        } */

        const user = await req.user
        const createTagDto = new CreateTagDto({user, ...req.body})

        const tag = await TagService.create(createTagDto)

        res.status(StatusCodes.OK).json({tag})
    },

    update: async (req, res) => {
        // #swagger.tags = ['Tag']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/UpdateTag' }
        } */

        const tag = await TagService.update(new UpdateTagDto({id: parseInt(req.params.id), ...req.body}))

        if (!tag) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Tag not found"})
        }

        res.status(StatusCodes.OK).json({tag})
    },

    delete: async (req, res) => {
        // #swagger.tags = ['Tag']
        
        const result = await TagService.delete(parseInt(req.params.id))

        if (!result) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Tag not found"})
        }

        res.send(StatusCodes.OK) 
    },

    get: async (req, res) => {
        // #swagger.tags = ['Tag']

        const tag = await TagService.get(parseInt(req.params.id))

        if (!tag) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Tag not found"})
        }

        res.status(StatusCodes.OK).json({tag})
    },

    getAll: async (req, res) => {
        // #swagger.tags = ['Tag']
        
        const tags = await TagService.getAll()

        res.status(StatusCodes.OK).json({tags})
    }
}

