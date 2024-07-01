import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/db'
import Tag from './tag'
import User from './user'

class Meetup extends Model {
    declare id: number
    declare name: string
    declare description: string
    declare time: Date
    declare place: string
    declare userId: number

    declare setTags: (tags: (Tag | null)[] | null) => Promise<void>
    declare addTags: (tags: (Tag | null)[] | null) => Promise<void>
    declare setUser: (user: User | null) => Promise<void>
    declare hasMeetupUser: (user: User) => Promise<boolean>
}

Meetup.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        },
    time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'meetup',
    timestamps: false,
})

Meetup.belongsToMany(Tag, { through: 'meetup_tag'})
Tag.belongsToMany(Meetup, { through: 'meetup_tag'})

Meetup.belongsToMany(User, { through: 'meetup_user', as: 'MeetupUsers' })
User.belongsToMany(Meetup, { through: 'meetup_user', as: 'UserMeetups' })

Meetup.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasMany(Meetup, {
    foreignKey: 'userId',
    as: 'meetups',
});

export default Meetup