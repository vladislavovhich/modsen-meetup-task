import { Request, Response, NextFunction } from "express";
import Joi from "joi"

const {StatusCodes} = require("http-status-codes")

export const isValid = <T extends Request<any, any, any, any>>(schema: Joi.Schema, property: keyof T) => { 
    return (req: T, res: Response, next: NextFunction) => { 
        const { error } = schema.validate(req[property]); 
        const valid = error == null; 
        
        if (valid) { 
            next(); 
        } else { 
            const { details } = error; 
            const message = details.map(i => i.message).join(',');
            
            res.status(StatusCodes.BAD_REQUEST).json({ error: message }) 
        } 
    } 
} 
