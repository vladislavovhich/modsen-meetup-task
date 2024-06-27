import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateMeetupDto } from '../dto/meetup/create-meetup.dto'
import { UpdateMeetupDto} from '../dto/meetup/update-meetup.dto'
import { GetMeetupsDto, Fields } from '../dto/meetup/get-meetups.dto'
import { CreateMeetupRequest, UpdateMeetupRequest, GetAllMeetupsRequest, MeetupIdRequest } from '../schemas/meetup.schemas'
import MeetupService from '../services/meetup.service'
import User from '../models/user'

const MeetupController = {
    create: async (req: CreateMeetupRequest, res: Response) => {
        // #swagger.tags = ['Meetup']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/CreateMeetup' }
        } */

        const user = await req.user

        const createMeetupDto = new CreateMeetupDto({
            name: req.body.name,
            place: req.body.place,
            time: req.body.time,
            description: req.body.description,
            tags: [],
            user: user as User
        })

        createMeetupDto.tags = !!req.body.tags ? req.body.tags : []

        const meetup = await MeetupService.create(createMeetupDto)
        
        res.status(StatusCodes.OK).json({meetup})
    },

    update: async (req: UpdateMeetupRequest, res: Response): Promise<void> => {
        // #swagger.tags = ['Meetup']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/UpdateMeetup' }
        } */

        const user = await req.user

        const updateMeetupDto = new UpdateMeetupDto({
            id: parseInt(req.params.id),
            name: req.body.name,
            place: req.body.place,
            time: req.body.time,
            description: req.body.description,
            tags: [],
            user: user as User
        })

        updateMeetupDto.tags = !!req.body.tags ? req.body.tags : []

        const meetup = await MeetupService.update(updateMeetupDto)

        if (!meetup) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Meetup not found"})
        }

        res.status(StatusCodes.OK).json(meetup)
    },
    
    delete: async (req: MeetupIdRequest, res: Response) => {
        // #swagger.tags = ['Meetup']

        const result = await MeetupService.delete(parseInt(req.params.id))

        if (!result) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Meetup not found"})
        }

        res.send(StatusCodes.OK) 
    },

    get: async (req: MeetupIdRequest, res: Response) => {
        // #swagger.tags = ['Meetup']

        const meetup = await MeetupService.get(parseInt(req.params.id))

        if (!meetup) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Meetup not found"})
        }

        res.status(StatusCodes.OK).json({meetup})
    },

    getAll: async (req: GetAllMeetupsRequest, res: Response) => {
        // #swagger.tags = ['Meetup']
    
        
        let sortFields: Fields = [
            ["nameSort", req.query.nameSort], 
            ["descriptionSort", req.query.descriptionSort], 
            ["timeSort", req.query.timeSort], 
            ["placeSort", req.query.placeSort]
        ]

        let filterFields: Fields = [
            ["name", req.query.name], 
            ["description", req.query.description], 
            ["time", req.query.time], 
            ["place", req.query.place]
        ]

        const pageSize = req.query.pageSize || 20, page = req.query.page || 1

        sortFields = sortFields.map(field => [field[0].split("Sort")[0], field[1]]).filter(field => field[1]) as Fields
        filterFields = filterFields.filter(field => field[1]) as Fields

        const meetups = await MeetupService.getAll(new GetMeetupsDto({
            sortFields: sortFields,
            filterFields: filterFields,
            page: page,
            pageSize: pageSize,
            offset: 0
        }))

        res.status(StatusCodes.OK).json({meetups})
    }
}

export default MeetupController
