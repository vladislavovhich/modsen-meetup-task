import Joi from "joi"
import User from "../../models/user"

interface ISubsMeetupDto {
    meetupId: number
    user: User
}

class SubsMeetupDto implements ISubsMeetupDto {
    public meetupId: number
    public user: User

    constructor(data: ISubsMeetupDto) {
        this.user = data.user
        this.meetupId = data.meetupId
    }
}

const SubsMeetupSchema = Joi.object<ISubsMeetupDto>({
    meetupId: Joi.number().integer().min(1)
})

export {SubsMeetupDto, ISubsMeetupDto, SubsMeetupSchema}