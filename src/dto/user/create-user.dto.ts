import Joi from "joi"

interface ICreateUserDto {
    email: string
    password: string
    roleId: number
}

class CreateUserDto implements ICreateUserDto {
    public email: string
    public password: string
    public roleId: number

    constructor(data: ICreateUserDto) {
        this.email = data.email
        this.password = data.password
        this.roleId = data.roleId
    }
}

const CreateUserSchema = Joi.object<ICreateUserDto>({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).alphanum().required(),
    roleId: Joi.number().integer().valid(1, 2).required()
})

export {CreateUserDto, ICreateUserDto, CreateUserSchema}