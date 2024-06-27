import { Request } from 'express'
import { ICreateUserDto } from '../dto/user/create-user.dto'
import { ILoginUserDto } from '../dto/user/login-user.dto'

interface CreateUserRequest extends Request {
    body: ICreateUserDto
}

interface LoginUserRequest extends Request {
    body: ILoginUserDto
}


export {CreateUserRequest, LoginUserRequest}