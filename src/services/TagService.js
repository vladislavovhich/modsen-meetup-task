const TagModel = require('../models/tag')

const TagService = {
    create: async (createTagDto) => {
        let tag = await TagModel.create(createTagDto)

        await tag.setUser(createTagDto.user)

        return tag
    },

    update: async (updateTagDto) => {
        let tag = await TagService.get(updateTagDto.id)

        if (!tag) {
            return null
        }

        await tag.update(updateTagDto)

        return tag
        
    },

    delete: async (id) => {
        let tag = await TagService.get(id)

        if (!tag) {
            return null
        }

        await tag.destroy()

        return true
    },

    get: async (id) => {
        let tag = await TagModel.findOne({where: id})

        return tag
    },

    getAll: async () => {
        let tags = await TagModel.findAll()

        return tags
    }

}

module.exports = TagService