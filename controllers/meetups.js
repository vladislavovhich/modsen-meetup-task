const CreateMeetupDto = require('../dto/CreateMeetupDto')
const GetMeetupsDto = require('../dto/GetMeetupsDto')
const UpdateMeetupDto = require('../dto/UpdateMeetupDto')

const MeetupService = require('../services/MeetupService')

module.exports = {
    create: async (req, res) => {
        // #swagger.tags = ['Meetup']

        let user = await req.user
        let createMeetupDto = new CreateMeetupDto({user, ...req.body})

        createMeetupDto.tags = !!req.body.tags ? req.body.tags.map(tag => +tag) : []

        let meetup = await MeetupService.create(createMeetupDto)
        
        res.status(200).json({meetup})
    },

    update: async (req, res) => {
        // #swagger.tags = ['Meetup']

        let updateMeetupDto = new UpdateMeetupDto({id: +req.params.id, ...req.body})

        updateMeetupDto.tags = !!req.body.tags ? req.body.tags.map(tag => +tag) : []

        let meetup = await MeetupService.update(updateMeetupDto)

        if (!meetup) {
            res.status(400).json({message: "Meetup not found"})
        }

        res.status(200).json(meetup)
    },
    
    delete: async (req, res) => {
        // #swagger.tags = ['Meetup']

        let result = await MeetupService.delete(+req.params.id)

        if (!result) {
            res.status(400).json({message: "Meetup not found"})
        }

        res.send(200) 
    },
    get: async (req, res) => {
        // #swagger.tags = ['Meetup']

        let meetup = await MeetupService.get(+req.params.id)

        if (!meetup) {
            res.status(400).json({message: "Meetup not found"})
        }

        res.status(200).json({meetup})
    },

    getAll: async (req, res) => {
        // #swagger.tags = ['Meetup']
  
        let sortFields = [["nameSort", req.query.nameSort], ["descriptionSort", req.query.descriptionSort], ["timeSort", req.query.timeSort], ["placeSort", req.query.placeSort]]
        let filterFields = [["name", req.query.name], ["description", req.query.description], ["time", req.query.time], ["place", req.query.place]]
        let offset = req.query.offset, limit = req.query.limit

        sortFields = sortFields.map(field => [field[0].split("Sort")[0], field[1]]).filter(field => !!field[1])
        filterFields = Object.fromEntries(filterFields.filter(field => field[1]))

        let meetups = await MeetupService.getAll(new GetMeetupsDto({sortFields, filterFields, offset, limit}))

        res.status(200).json({meetups})
    }
}

