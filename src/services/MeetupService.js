const TagModel = require('../models/tag')
const MeetupModel = require('../models/meetup')

const TagService = require('./TagService')

const MeetupService = {
    create: async (createMeetupDto) => {
        const meetup = await MeetupModel.create(createMeetupDto)
        const tags = await MeetupService.handleTags(createMeetupDto.tags, createMeetupDto.user)

        await meetup.addTags(tags)
        await meetup.setUser(createMeetupDto.user)

        return meetup
    },

    update: async (updateMeetupDto) => {
        const meetup = await MeetupService.get(updateMeetupDto.id)
        const tags = await MeetupService.handleTags(updateMeetupDto.tags, updateMeetupDto.user)

        if (!meetup) {
            return null
        }
        
        await meetup.update(updateMeetupDto)
        await meetup.setTags(tags)

        return meetup
        
    },

    delete: async (id) => {
        const meetup = await MeetupService.get(id)

        if (!meetup) {
            return null
        }

        await meetup.destroy()

        return true
    },

    get: async (id) => {
        const meetup = await MeetupModel.findOne({where: id})

        return meetup
    },

    getAll: async (getMeetupsDto) => {
        const meetups = await MeetupModel.findAll({
            include: TagModel,
            order: getMeetupsDto.sortFields,
            limit: getMeetupsDto.pageSize,
            offset: getMeetupsDto.offset,
            where: getMeetupsDto.filterFields
        })

        return meetups
    },

    handleTags: async (vals, user) => {
        const tags = [...vals]

        for (let i = 0; i < tags.length; i++) {
            let tag = await TagModel.findOne({where: {name: tags[i]}})

            if (tag) {
                tags[i] = tag
            } else {
                tags[i] = await TagService.create({name: tags[i], user})
            }
        }

        return tags
    }

}

module.exports = MeetupService