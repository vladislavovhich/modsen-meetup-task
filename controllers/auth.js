const User = require('../models/user')
const Role = require('../models/role')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const UserService = require("../services/UserService")
const CreateUserDto = require('../dto/CreateUserDto')

module.exports = {
    register: async (req, res) => {
        // #swagger.tags = ['Auth']

        let user = await UserService.create(new CreateUserDto(req.body))

        if (!user) {
            return res.status(400).json({
                message: `User already exists`
            })
        }

        return res.status(200).json(user)
    },

    login: async (req, res) => {
        // #swagger.tags = ['Auth']

        let {email, password} = req.body

        let user = await UserService.findByEmail(email)

        if (!user) {
            return res.status(400).json({
                message: `User doesn't exist: ${email}`
            })
        }

        let compareResult = await bcrypt.compare(password, user.password)

        if (!compareResult) {
            return res.status(400).json({
                message: `Incorrect password: ${password}`
            })
        }

        const token = jwt.sign({id: user.id}, "secret", {expiresIn: "1d"})

        res.cookie("jwt", token, {httpOnly: true, secure: true}).status(200).send(token)
    },

    logout: async (req, res) => {
        // #swagger.tags = ['Auth']
        
        res.clearCookie('jwt').status(200).json({
            message: 'You have logged out'
        })
    }
}