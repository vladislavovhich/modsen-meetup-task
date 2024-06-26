import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/db'
import Role from './role'
import Meetup from './meetup'

class User extends Model {
    declare id: number
    declare email: string
    declare password: string
    declare roleId: number

    declare setRole: (role: Role | null) => Promise<void>
    declare removeUserMeetup: (meetup: Meetup | number) => Promise<void>
    declare hasUserMeetup: (meetup: Meetup | number) => Promise<boolean>
    declare addUserMeetup: (meetup: Meetup | Meetup[], options?: any) => Promise<void>
}

User.init(
  {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
        sequelize,
        modelName: 'user',
        timestamps: false,
  }
)

export default User 