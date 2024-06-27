import { Model, DataTypes } from 'sequelize'

import sequelize from '../config/db'
import User from './user'
import Role from './role'

class Tag extends Model {
    declare id: number
    declare name: string
    declare userId: number

    declare setUser: (user: User | null) => Promise<void>
}

Tag.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    sequelize,
    modelName: 'tag',
    timestamps: false,
})

Tag.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
})

User.hasMany(Tag, {
    foreignKey: 'userId',
    as: 'tags',
})

export default Tag
