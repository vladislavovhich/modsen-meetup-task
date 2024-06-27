import { Request } from "express"
import User from "../models/user"

interface TagIdParams {
    id: string
}

interface TagIdRequest extends Request<TagIdParams> {}

interface CreateTagRequest extends TagIdRequest {
    body: {
       name: string
    }
}

interface UpdateTagRequest extends TagIdRequest {
    body: {
       name: string
    }
}

export {CreateTagRequest, UpdateTagRequest, TagIdRequest}