const User = require('../models/user')
const Role = require('../models/role')

const jwt = require('jsonwebtoken')
const passport = require('passport')

const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        // #swagger.tags = ['Auth']

        let {email, password, roleId} = req.body
        let role = await Role.findByPk(roleId)

        if (!role) {
            return res.status(400).json({
                message: `Incorrect role number: ${roleId}`
            })
        }

        let userExist = await User.findOne({where: {email}})

        if (userExist) {
            return res.status(400).json({
                message: `There is a user with the same email: ${email}`
            })
        }

        password = await bcrypt.hash(password, 10)

        let user = await User.create({ email, password})

        await user.setRole(role)

        return res.json(user)
    },

    login: async (req, res) => {
        // #swagger.tags = ['Auth']

        let {email, password} = req.body

        let user = await User.findOne({
            where: {email}
        })

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