const TagService = require("../services/TagService")
const CreateTagDto = require("../dto/CreateTagDto")
const UpdateTagDto = require("../dto/CreateTagDto")

module.exports = {
    create: async (req, res) => {
        // #swagger.tags = ['Tag']

        let user = await req.user
        let createTagDto = new CreateTagDto({user, ...req.body})

        let tag = await TagService.create(createTagDto)

        res.status(200).json({tag})
    },

    update: async (req, res) => {
        // #swagger.tags = ['Tag']

        let tag = await TagService.update(new UpdateTagDto({id: +req.params.id, ...req.body}))

        if (!tag) {
            res.status(400).json({message: "Tag not found"})
        }

        res.status(200).json({tag})
    },

    delete: async (req, res) => {
        // #swagger.tags = ['Tag']
        
        let result = await TagService.delete(+req.params.id)

        if (!result) {
            res.status(400).json({message: "Tag not found"})
        }

        res.send(200) 
    },

    get: async (req, res) => {
        // #swagger.tags = ['Tag']

        let tag = await TagService.get(+req.params.id)

        if (!tag) {
            res.status(400).json({message: "Tag not found"})
        }

        res.status(200).json({tag})
    },

    getAll: async (req, res) => {
        // #swagger.tags = ['Tag']
        
        let tags = await TagService.getAll()

        res.status(200).json({tags})
    }
}

