import Joi from "joi"

interface ILoginUserDto {
    email: string
    password: string
}

class LoginUserDto {
    public email: string
    public password: string

    constructor(data: ILoginUserDto) {
        this.email = data.email
        this.password = data.password
    }
}

const LoginUserSchema = Joi.object<ILoginUserDto>({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).alphanum().required()
})

export {LoginUserDto, ILoginUserDto, LoginUserSchema}