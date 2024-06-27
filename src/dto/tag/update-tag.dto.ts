import Joi from "joi"

interface IUpdateTagDto {
    id: number
    name: string
}

class UpdateTagDto {
    public id: number
    public name: string

    constructor(data: IUpdateTagDto) {
        this.id = data.id
        this.name = data.name
    }
}

const UpdateTagSchema = Joi.object<IUpdateTagDto>({
    name: Joi.string().min(1).max(50).required()
})

export {UpdateTagDto, IUpdateTagDto, UpdateTagSchema}