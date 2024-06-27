import User from "../../models/user"
import Joi from "joi"

interface ICreateTagDto {
    user: User
    name: string
}

class CreateTagDto implements ICreateTagDto {
    public user: User
    public name: string

    constructor(data: ICreateTagDto) {
        this.user = data.user
        this.name = data.name
    }
}

const CreateTagSchema = Joi.object<ICreateTagDto>({
    name: Joi.string().min(1).max(50).required()
})

const QueryIdSchema = Joi.object({
    id: Joi.number().min(1).required()  
})

export {CreateTagDto, ICreateTagDto, CreateTagSchema, QueryIdSchema}