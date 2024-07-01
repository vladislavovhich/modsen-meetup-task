import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import UserService from '../services/user.service'
import { CreateUserDto } from '../dto/user/create-user.dto'
import { LoginUserDto} from '../dto/user/login-user.dto'
import { CreateUserRequest, LoginUserRequest } from '../schemas/user.schemas'

export const AuthController = {
    register: async (req: CreateUserRequest , res: Response) => {
        // #swagger.tags = ['Auth']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/RegisterUser' }
        } */
        // #swagger.responses[200] = { description: 'User successfully registered' }
        // #swagger.responses[400] = { description: 'There is user that has the same login' }

        const user = await UserService.register(new CreateUserDto(req.body))

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: `User already exists`
            })
        }

        res.status(StatusCodes.OK).json(user)
    },

    login: async (req: LoginUserRequest, res: Response) => {
        // #swagger.tags = ['Auth']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/LoginUser' }
        } */
        // #swagger.responses[200] = { description: 'User successfully logged in' }
        // #swagger.responses[400] = { description: 'Incorrect login or passowrd' }

        const loginUserDto = new LoginUserDto({email: req.body.email, password: req.body.password})

        const result = await UserService.authorize(loginUserDto)

        if (!result) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Incorrect login or password"
            })
        }

        res.cookie("jwt", result.accessToken, {httpOnly: true, secure: true})
        res.cookie("jwt-refresh", result.refreshToken, {httpOnly: true, secure: true})

        res.status(StatusCodes.OK).send({result})
    },

    refreshToken: async (req: Request, res: Response) => {
        // #swagger.tags = ['Auth']
        // #swagger.responses[200] = { description: 'Tokens are successfully refreshed' }
        // #swagger.responses[400] = { description: 'No token specified' }

        
        const refreshToken = req.cookies['jwt-refresh']

        await UserService.refreshToken(refreshToken, (result) => {
            if (!result) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: 'No refresh token specified'
                })
            }

            res.cookie("jwt", result.accessToken, {httpOnly: true, secure: true})
            res.cookie("jwt-refresh", result.refreshToken, {httpOnly: true, secure: true})

            res.status(StatusCodes.OK).send(result)
        })
    },

    logout: async (req: Request, res: Response) => {
        // #swagger.tags = ['Auth']
        // #swagger.responses[200] = { description: 'User successfully logged out' }

        
        res.clearCookie('jwt')
        res.clearCookie("jwt-refresh")

        res.status(StatusCodes.OK).json({
            message: 'You have logged out'
        })
    }
}