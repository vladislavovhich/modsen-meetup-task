const UserModel = require('../models/user')
const RoleModel = require('../models/role')

const bcrypt = require('bcrypt')

const UserService = {
    create: async (createUserDto) => {
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
    }
}

module.exports = UserService