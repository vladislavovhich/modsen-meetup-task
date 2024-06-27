import UserModel from "../models/user"
import RoleModel from "../models/role"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { ICreateUserDto } from "../dto/user/create-user.dto"
import { ILoginUserDto } from "../dto/user/login-user.dto"

interface ITokens {
    accessToken: string
    refreshToken: string
}

const UserService = {
    register: async (createUserDto: ICreateUserDto): Promise<UserModel | null> => {
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

    findByEmail: async (email: string): Promise<UserModel | null> => {
        return await UserModel.findOne({where: {email}})
    },

    authorize: async (loginUserDto: ILoginUserDto): Promise<ITokens | null> => {
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

    getTokens: async (userId: number): Promise<ITokens | null> => {
        const accessToken = jwt.sign({id: userId}, "secret", {expiresIn: "1d"})
        const refreshToken = jwt.sign({ id: userId }, "refresh_secret", { expiresIn: '7d' })

        return {accessToken, refreshToken}
    },

    refreshToken: async (refreshToken: string, callback: (tokens: ITokens | null) => void): Promise<void> => {
        jwt.verify(refreshToken, "refresh_secret", async (err, user) => {
            if (err) {
                return callback(null)
            }
            
            const tokens = await UserService.getTokens((user as UserModel).id)

            return callback(tokens)
        });
    }
}

export default UserService