const CreateMeetupDto = require('../dto/CreateMeetupDto')
const GetMeetupsDto = require('../dto/GetMeetupsDto')
const UpdateMeetupDto = require('../dto/UpdateMeetupDto')

const MeetupService = require('../services/MeetupService')

const {StatusCodes} = require('http-status-codes')

module.exports = {
    create: async (req, res) => {
        // #swagger.tags = ['Meetup']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/CreateMeetup' }
        } */

        const user = await req.user
        const createMeetupDto = new CreateMeetupDto({user, ...req.body})

        createMeetupDto.tags = !!req.body.tags ? req.body.tags.map(tag => parseInt(tag)) : []

        const meetup = await MeetupService.create(createMeetupDto)
        
        res.status(StatusCodes.OK).json({meetup})
    },

    update: async (req, res) => {
        // #swagger.tags = ['Meetup']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/UpdateMeetup' }
        } */

        const updateMeetupDto = new UpdateMeetupDto({id: parseInt(req.params.id), ...req.body})

        updateMeetupDto.tags = !!req.body.tags ? req.body.tags.map(tag => parseInt(tag)) : []

        const meetup = await MeetupService.update(updateMeetupDto)

        if (!meetup) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Meetup not found"})
        }

        res.status(StatusCodes.OK).json(meetup)
    },
    
    delete: async (req, res) => {
        // #swagger.tags = ['Meetup']

        const result = await MeetupService.delete(parseInt(req.params.id))

        if (!result) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Meetup not found"})
        }

        res.send(StatusCodes.OK) 
    },

    get: async (req, res) => {
        // #swagger.tags = ['Meetup']

        const meetup = await MeetupService.get(parseInt(req.params.id))

        if (!meetup) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Meetup not found"})
        }

        res.status(StatusCodes.OK).json({meetup})
    },

    getAll: async (req, res) => {
        // #swagger.tags = ['Meetup']
  
        let sortFields = [["nameSort", req.query.nameSort], ["descriptionSort", req.query.descriptionSort], ["timeSort", req.query.timeSort], ["placeSort", req.query.placeSort]]
        let filterFields = [["name", req.query.name], ["description", req.query.description], ["time", req.query.time], ["place", req.query.place]]
        const pageSize = parseInt(req.query.pageSize) || 20, page = parseInt(req.query.page) || 1

        sortFields = sortFields.map(field => [field[0].split("Sort")[0], field[1]]).filter(field => !!field[1])
        filterFields = Object.fromEntries(filterFields.filter(field => field[1]))

        const meetups = await MeetupService.getAll(new GetMeetupsDto({sortFields, filterFields, pageSize, page}))

        res.status(StatusCodes.OK).json({meetups})
    }
}

