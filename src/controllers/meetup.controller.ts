import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateMeetupDto } from '../dto/meetup/create-meetup.dto'
import { UpdateMeetupDto} from '../dto/meetup/update-meetup.dto'
import { GetMeetupsDto, Fields } from '../dto/meetup/get-meetups.dto'
import { CreateMeetupRequest, UpdateMeetupRequest, GetAllMeetupsRequest, MeetupIdRequest } from '../schemas/meetup.schemas'
import MeetupService from '../services/meetup.service'
import User from '../models/user'
import { SubsMeetupDto } from '../dto/meetup/subs-meetup.dto'

const MeetupController = {
    create: async (req: CreateMeetupRequest, res: Response) => {
        // #swagger.tags = ['Meetup']
        /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: { $ref: '#/definitions/CreateMeetup' }
        } */
        // #swagger.responses[200] = { description: 'Meetup successfully created' }

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
        // #swagger.parameters['id'] = { description: 'ID' }
        // #swagger.responses[200] = { description: 'Meetup successfully updated' }
        // #swagger.responses[404] = { description: 'Meetup not found' }

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
        // #swagger.parameters['id'] = { description: 'ID' }
        // #swagger.responses[200] = { description: 'Meetup successfully deleted' }
        // #swagger.responses[404] = { description: 'Meetup not found' }

        const result = await MeetupService.delete(parseInt(req.params.id))

        if (!result) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Meetup not found"})
        }

        res.send(StatusCodes.OK) 
    },

    subscribe: async (req: MeetupIdRequest, res: Response) => {
        // #swagger.tags = ['Meetup']
        // #swagger.parameters['id'] = { description: 'ID' }
        // #swagger.responses[200] = { description: 'Successfully subscribed on Meetup' }
        // #swagger.responses[404] = { description: 'Meetup not found' }

        const user = await req.user
        const subsMeetupDto = new SubsMeetupDto({meetupId: parseInt(req.params.id), user: user as User})

        const result = await MeetupService.subsribe(subsMeetupDto)

        if (!result) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Meetup not found"})
            return
        }

        res.sendStatus(StatusCodes.OK)
    },

    unsubscribe: async (req: MeetupIdRequest, res: Response) => {
        // #swagger.tags = ['Meetup']
        // #swagger.parameters['id'] = { description: 'ID' }
        // #swagger.responses[200] = { description: 'Successfully unsubscribed on Meetup' }
        // #swagger.responses[400] = { description: 'Meetup not found or user is not subscribed to the Meetup' }

        const user = await req.user
        const subsMeetupDto = new SubsMeetupDto({meetupId: parseInt(req.params.id), user: user as User})

        const result = await MeetupService.unsubscribe(subsMeetupDto)
        
        if (!result) {
            res.status(StatusCodes.BAD_REQUEST).json({message: "Cant't unsubcribe"})
            return
        }

        res.send(StatusCodes.OK)
    },

    get: async (req: MeetupIdRequest, res: Response) => {
        // #swagger.tags = ['Meetup']
        // #swagger.parameters['id'] = { description: 'ID' }
        // #swagger.responses[200] = { description: 'Meetup' }
        // #swagger.responses[404] = { description: 'Meetup not found' }

        const meetup = await MeetupService.get(parseInt(req.params.id))

        if (!meetup) {
            res.status(StatusCodes.NOT_FOUND).json({message: "Meetup not found"})
        }

        res.status(StatusCodes.OK).json({meetup})
    },

    getAll: async (req: GetAllMeetupsRequest, res: Response) => {
        // #swagger.tags = ['Meetup']
        // #swagger.parameters['nameSort'] = { in: 'query', description: 'nameSort [ASC OR DESC]', required: false, type: 'string' }
        // #swagger.parameters['descriptionSort'] = { in: 'query', description: 'descriptionSort [ASC OR DESC]', required: false, type: 'string' }
        // #swagger.parameters['timeSort'] = { in: 'query', description: 'timeSort [ASC OR DESC] ', required: false, type: 'string' }
        // #swagger.parameters['placeSort'] = { in: 'query', description: 'placeSort [ASC OR DESC]', required: false, type: 'string' }
        // #swagger.parameters['name'] = { in: 'query', description: 'name to filter', required: false, type: 'string' }
        // #swagger.parameters['description'] = { in: 'query', description: 'description to filter', required: false, type: 'string' }
        // #swagger.parameters['time'] = { in: 'query', description: 'time to filter', required: false, type: 'string' }
        // #swagger.parameters['place'] = { in: 'query', description: 'place to filter', required: false, type: 'string' }
        // #swagger.parameters['pageSize'] = { in: 'query', description: 'pageSize', required: false, type: 'number' }
        // #swagger.parameters['page'] = { in: 'query', description: 'page number', required: false, type: 'number' }
        // #swagger.responses[200] = { description: 'Meetups list' }
      
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
