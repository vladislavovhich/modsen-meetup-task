import TagModel from "../models/tag"

import { ICreateTagDto } from "../dto/tag/create-tag.dto"
import { IUpdateTagDto } from "../dto/tag/update-tag.dto"

const TagService = {
    create: async (createTagDto: ICreateTagDto): Promise<TagModel | null> => {
        const tag = await TagModel.create({name: createTagDto.name})
        
        await tag.setUser(createTagDto.user)

        return tag
    },

    update: async (updateTagDto: IUpdateTagDto): Promise<TagModel | null> => {
        const tag = await TagService.get(updateTagDto.id)

        if (!tag) {
            return null
        }

        await tag.update(updateTagDto)

        return tag
    },

    delete: async (id: number): Promise<boolean | null> => {
        const tag = await TagService.get(id)

        if (!tag) {
            return null
        }

        await tag.destroy()

        return true
    },

    get: async (id: number): Promise<TagModel | null> => {
        const tag = await TagModel.findOne({where: {id}})

        return tag
    },

    getAll: async (): Promise<TagModel[] | null> => {
        const tags = await TagModel.findAll()

        return tags
    }

}

export default TagService