import Joi from "joi"
import {PaginationDto, IPaginationDto} from "../pagination.dto"

type Fields = [string, string | undefined][]

interface IGetMeetupsDto extends IPaginationDto {
    sortFields: Fields
    filterFields: Fields
}

interface IGetMeetupsQueryParams {
    nameSort?:  string
    descriptionSort?:  string
    timeSort?:  string
    placeSort?:  string
    name?: string
    description?:  string
    time?:  string
    place?:  string,
    page: number,
    pageSize: number
}

class GetMeetupsDto extends PaginationDto implements IGetMeetupsDto {
    public sortFields: Fields
    public filterFields: Fields

    constructor(data: IGetMeetupsDto) {
        super(data)
        
        this.sortFields = data.sortFields
        this.filterFields = data.filterFields
    }
}

const GetAllMeetupsSchema = Joi.object<IGetMeetupsQueryParams>({
    nameSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
    placeSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
    descriptionSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
    timeSort: Joi.string().valid("ASC", "DESC").insensitive().allow(null),
    name: Joi.string().min(1).max(50).allow(null),
    description: Joi.string().min(1).allow(null),
    place: Joi.string().min(1).max(50).allow(null),
    time: Joi.date().allow(null),
    page: Joi.number().integer().min(1).allow(null),
    pageSize: Joi.when('page', {
        is: Joi.exist().not(null),
        then: Joi.number().integer().min(1).required(),
        otherwise: Joi.number().integer().min(1).allow(null)
    })
})

export {GetMeetupsDto, IGetMeetupsDto, Fields, IGetMeetupsQueryParams, GetAllMeetupsSchema}