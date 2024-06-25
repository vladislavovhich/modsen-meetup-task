const UserModel = require('../models/user')
const RoleModel = require('../models/role')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserService = {
    register: async (createUserDto) => {
        let role = await RoleModel.findByPk(createUserDto.roleId)

        let userExist = await UserService.findByEmail(createUserDto.email)

        if (userExist) {
            return null
        }

        let password = await bcrypt.hash(createUserDto.password, 10)

        let user = await UserModel.create({ email: createUserDto.email, password})

        await user.setRole(role)

        return user
    },

    findByEmail: async (email) => {
        return await UserModel.findOne({where: {email}})
    },

    authorize: async (loginUserDto) => {
        const user = await UserService.findByEmail(loginUserDto.email)

        if (!user) {
            return null
        }

        const compareResult = await bcrypt.compare(loginUserDto.password, user.password)

        if (!compareResult) {
            return null
        }

        const tokens = UserService.getTokens(user.id)

        return tokens
    },

    getTokens: async (userId) => {
        const accessToken = jwt.sign({id: userId}, "secret", {expiresIn: "1d"})
        const refreshToken = jwt.sign({ id: userId }, "refresh_secret", { expiresIn: '7d' })

        return {accessToken, refreshToken}
    },

    refreshToken: async (refreshToken, callback) => {
        jwt.verify(refreshToken, "refresh_secret", async (err, user) => {
            if (err) {
                return callback(null)
            }
            
            const tokens = await UserService.getTokens(user.id)

            return callback(tokens)
        });
    }
}

module.exports = UserService