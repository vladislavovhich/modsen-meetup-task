import { StatusCodes } from "http-status-codes"
import { Request, Response, NextFunction } from "express";
import Tag from "../models/tag";
import Meetup from "../models/meetup";
import User from "../models/user";


export const checkRole = <T extends Request<any, any, any, any>>(requiredRoles: number[]) => async (req: T, res: Response, next: NextFunction) => {
    let user = (await req.user) as User

    if (user && requiredRoles.includes(user.roleId)) {
        return next()
    } else {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access denied. Insufficient permissions.' })
    }
}

export const ownsResource = <T extends Request<any, any, any, any>>(resourceModel: typeof Tag | typeof Meetup) => async (req: T, res: Response, next: NextFunction) => {
    try {
        const user = (await req.user) as User
        const resourceId = parseInt(req.params.id)

        console.log(req.params.id)
        const item = await resourceModel.findByPk(resourceId)

        console.log(item, user)
        
        if (item && user && user.id == item.userId) {
            return next()
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({ 
                message: 'Access denied. Insufficient permissions.' 
            })
        }
    } catch (error) {
        next(error)
    }
}
