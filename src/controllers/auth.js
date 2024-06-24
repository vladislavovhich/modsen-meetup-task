const {StatusCodes} = require('http-status-codes')

const UserService = require("../services/UserService")
const CreateUserDto = require('../dto/CreateUserDto')
const LoginUserDto = require('../dto/LoginUserDto')

module.exports = {
    register: async (req, res) => {
        // #swagger.tags = ['Auth']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/RegisterUser' }
        } */

        const user = await UserService.register(new CreateUserDto(req.body))

        if (!user) {
            return res.status(StatusCodes.OK).json({
                message: `User already exists`
            })
        }

        res.status(StatusCodes.OK).json(user)
    },

    login: async (req, res) => {
        // #swagger.tags = ['Auth']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/LoginUser' }
        } */

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

    refreshToken: async (req, res) => {
        // #swagger.tags = ['Auth']
        
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

    logout: async (req, res) => {
        // #swagger.tags = ['Auth']
        
        res.clearCookie('jwt')
        res.clearCookie("jwt-refresh")

        res.status(StatusCodes.OK).json({
            message: 'You have logged out'
        })
    }
}