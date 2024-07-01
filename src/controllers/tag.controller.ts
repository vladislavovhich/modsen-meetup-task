import {Request, Response} from "express"
import TagService from "../services/tag.service"
import { CreateTagDto } from "../dto/tag/create-tag.dto"
import { UpdateTagDto } from "../dto/tag/update-tag.dto"
import { StatusCodes } from "http-status-codes"
import { CreateTagRequest, TagIdRequest, UpdateTagRequest } from "../schemas/tag.schemas"
import User from "../models/user"

const TagController = {
    create: async (req: CreateTagRequest, res: Response) => {
        // #swagger.tags = ['Tag']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/CreateTag' }
        } */
        // #swagger.responses[200] = { description: 'Tag is successfully created' }


        const user = (await req.user) as User

        const createTagDto = new CreateTagDto({
            user: user, 
            name: req.body.name
        })

        const tag = await TagService.create(createTagDto)

        res.status(StatusCodes.OK).json({tag})
    },

    update: async (req: UpdateTagRequest, res: Response) => {
        // #swagger.tags = ['Tag']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/UpdateTag' }
        } */
        // #swagger.parameters['id'] = { description: 'ID' }
        // #swagger.responses[200] = { description: 'Tag is successfully updated' }
        // #swagger.responses[400] = { description: 'Can not update Tag' }

        const tag = await TagService.update(new UpdateTagDto({
            id: parseInt(req.params.id), 
            name: req.body.name
        }))

        if (!tag) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Tag not found"})
        }

        res.status(StatusCodes.OK).json({tag})
    },

    delete: async (req: TagIdRequest, res: Response) => {
        // #swagger.tags = ['Tag']
        // #swagger.parameters['id'] = { description: 'ID' }
        // #swagger.responses[200] = { description: 'Tag is successfully deleted' }
        // #swagger.responses[400] = { description: 'Can not delete Tag' }

        
        const result = await TagService.delete(parseInt(req.params.id))

        if (!result) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Tag not found"})
        }

        res.send(StatusCodes.OK) 
    },

    get: async (req: TagIdRequest, res: Response) => {
        // #swagger.tags = ['Tag']
        // #swagger.parameters['id'] = { description: 'ID' }
        // #swagger.responses[200] = { description: 'Tag is found' }
        // #swagger.responses[400] = { description: 'Can not find Tag' }

        const tag = await TagService.get(parseInt(req.params.id))

        if (!tag) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Tag not found"})
        }

        res.status(StatusCodes.OK).json({tag})
    },

    getAll: async (req: Request, res: Response) => {
        // #swagger.tags = ['Tag']
        // #swagger.responses[200] = { description: 'Tags list' }
        
        const tags = await TagService.getAll()

        res.status(StatusCodes.OK).json({tags})
    }
}

export default TagController
