import Joi from "joi"
import User from "../../models/user"

interface ICreateMeetupDto {
    name: string
    description: string
    place: string
    time: Date
    tags: string[]
    user: User
}

class CreateMeetupDto implements ICreateMeetupDto {
    public name: string
    public description: string
    public place: string
    public time: Date
    public tags: string[]
    public user: User

    constructor(data: ICreateMeetupDto) {
        this.name = data.name
        this.description = data.description
        this.place = data.place
        this.time = data.time
        this.tags = data.tags
        this.user = data.user
    }
}

const CreateMeetupSchema = Joi.object<ICreateMeetupDto>({
    name: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(65535).required(),
    place: Joi.string().min(1).max(50).required(),
    time: Joi.date().required(),
    tags: Joi.array().items(Joi.string()).allow(null)
})

export {CreateMeetupDto, ICreateMeetupDto, CreateMeetupSchema}