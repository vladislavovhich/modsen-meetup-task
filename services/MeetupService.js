const TagModel = require('../models/tag')
const MeetupModel = require('../models/meetup')

const MeetupService = {
    create: async (createMeetupDto) => {
        let meetup = await MeetupModel.create(createMeetupDto)
        let tags = createMeetupDto.tags

        await meetup.addTags(tags)
        await meetup.setUser(createMeetupDto.user)

        return meetup
    },

    update: async (updateMeetupDto) => {
        let meetup = await MeetupService.get(updateMeetupDto.id)

        if (!meetup) {
            return null
        }
        
        await meetup.update(updateMeetupDto)
        await meetup.setTags(updateMeetupDto.tags)

        return meetup
        
    },

    delete: async (id) => {
        let meetup = await MeetupService.get(id)

        if (!meetup) {
            return null
        }

        await meetup.destroy()

        return true
    },

    get: async (id) => {
        let meetup = await MeetupModel.findOne({where: id})

        return meetup
    },

    getAll: async (getMeetupsDto) => {
        let meetups = await MeetupModel.findAll({
            include: TagModel,
            order: getMeetupsDto.sortFields,
            limit: getMeetupsDto.limit,
            offset: getMeetupsDto.offset,
            where: getMeetupsDto.filterFields
        })

        return meetups
    }

}

module.exports = MeetupService