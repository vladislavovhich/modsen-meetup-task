import Joi from "joi"
import User from "../../models/user"

interface IUpdateMeetupDto {
    id: number
    name: string
    description: string
    place: string
    time: Date
    tags: string[]
    user: User
}

class UpdateMeetupDto implements IUpdateMeetupDto {
    public id: number
    public name: string
    public description: string
    public place: string
    public time: Date
    public tags: string[]
    public user: User

    constructor(data: IUpdateMeetupDto) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.place = data.place
        this.time = data.time
        this.tags = data.tags
        this.user = data.user
    }
}

const UpdateMeetupSchema = Joi.object<IUpdateMeetupDto>({
    name: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(65535).required(),
    place: Joi.string().min(1).max(50).required(),
    time: Joi.date().required(),
    tags: Joi.array().items(Joi.string()).allow(null)
})

export {UpdateMeetupDto, IUpdateMeetupDto, UpdateMeetupSchema}