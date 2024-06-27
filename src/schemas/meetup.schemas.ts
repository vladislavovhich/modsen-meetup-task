import { IGetMeetupsQueryParams } from "../dto/meetup/get-meetups.dto"
import User from "../models/user"
import { Request } from "express"
import { ParamsDictionary } from 'express-serve-static-core';

interface MeetupIdParams {
    id: string
}

interface MeetupIdRequest extends Request<MeetupIdParams> {
    params: MeetupIdParams
}

interface CreateMeetupRequest extends MeetupIdRequest {
    body: {
        name: string
        description: string
        place: string
        time: Date
        tags: string[]
    }
}

interface UpdateMeetupRequest extends MeetupIdRequest {
    body: {
        id: number
        name: string
        description: string
        place: string
        time: Date
        tags: string[]
    }
}

interface GetAllMeetupsRequest extends Request {
    query: { [key: string]: string | undefined } & IGetMeetupsQueryParams
}

export {CreateMeetupRequest, UpdateMeetupRequest, GetAllMeetupsRequest, MeetupIdRequest, MeetupIdParams}