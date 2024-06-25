const TagModel = require('../models/tag')

const TagService = {
    create: async (createTagDto) => {
        const tag = await TagModel.create(createTagDto)

        await tag.setUser(createTagDto.user)

        return tag
    },

    update: async (updateTagDto) => {
        const tag = await TagService.get(updateTagDto.id)

        if (!tag) {
            return null
        }

        await tag.update(updateTagDto)

        return tag
        
    },

    delete: async (id) => {
        const tag = await TagService.get(id)

        if (!tag) {
            return null
        }

        await tag.destroy()

        return true
    },

    get: async (id) => {
        const tag = await TagModel.findOne({where: id})

        return tag
    },

    getAll: async () => {
        const tags = await TagModel.findAll()

        return tags
    }

}

module.exports = TagService