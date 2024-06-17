const User = require('../models/user')
const jwt = require('jsonwebtoken')
const passport = require('passport')

module.exports = {
    register: async (req, res) => {
        let {email, password} = req.body

        let user = await User.create({
            email: email,
            password: password
        })

        return res.json(user)
    },

    login: async (req, res) => {
        try {
            let {email, password} = req.body

            let user = await User.findOne({
                where: {email}
            })

            if (!user) {
                return res.status(400).json({message: "User doesn't exist!"})
            }

            if (user.password != password) {
                return res.status(400).json({message: "Wrong password!"})
            }

            const token = jwt.sign(
                {
                    id: user.id
                }, 
                "secret",
                {
                    expiresIn: "1d"
                }
            )

            res.cookie("jwt", token, {httpOnly: true, secure: true}).status(200).send(token)
        }
        catch (error) {
            return res.json(error)
        }
    },

    logout: async (req, res) => {
        res
        .clearCookie('jwt')
        .status(200)
        .json({
            message: 'You have logged out'
        })
    }
}