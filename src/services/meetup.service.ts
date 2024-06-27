import TagModel from "../models/tag"
import MeetupModel from "../models/meetup"
import TagService from "./tag.service"
import UserModel from "../models/user"

import { ICreateMeetupDto } from "../dto/meetup/create-meetup.dto"
import { IUpdateMeetupDto } from "../dto/meetup/update-meetup.dto"
import { IGetMeetupsDto } from "../dto/meetup/get-meetups.dto"

const MeetupService = {
    create: async (createMeetupDto: ICreateMeetupDto): Promise<MeetupModel | null> => {
        const meetup = await MeetupModel.create({
            description: createMeetupDto.description,
            place: createMeetupDto.place,
            time: createMeetupDto.time,
            name: createMeetupDto.name
        })

        const tags = await MeetupService.handleTags(createMeetupDto.tags, createMeetupDto.user)

        await meetup.addTags(tags)
        await meetup.setUser(createMeetupDto.user)

        return meetup
    },

    update: async (updateMeetupDto: IUpdateMeetupDto): Promise<MeetupModel | null> => {
        const meetup = await MeetupService.get(updateMeetupDto.id)
        const tags = await MeetupService.handleTags(updateMeetupDto.tags, updateMeetupDto.user)

        if (!meetup) {
            return null
        }
        
        await meetup.update({
            description: updateMeetupDto.description,
            place: updateMeetupDto.place,
            time: updateMeetupDto.time,
            name: updateMeetupDto.name
        })

        await meetup.setTags(tags)

        return meetup
        
    },

    delete: async (id: number): Promise<null | boolean> => {
        const meetup = await MeetupService.get(id)

        if (!meetup) {
            return null
        }

        await meetup.destroy()

        return true
    },

    get: async (id: number): Promise<MeetupModel | null> => {
        const meetup = await MeetupModel.findOne({where: {id}})

        return meetup
    },

    getAll: async (getMeetupsDto: IGetMeetupsDto): Promise<MeetupModel[] | null> => {
        const meetups = await MeetupModel.findAll({
            include: TagModel,
            order: getMeetupsDto.sortFields as any,
            limit: getMeetupsDto.pageSize,
            offset: getMeetupsDto.offset,
            where: getMeetupsDto.filterFields as any
        })

        return meetups
    },

    handleTags: async (vals: string[], user: UserModel): Promise<(TagModel | null)[]> => {
        const tags: (TagModel | null)[] = Array(vals.length).fill(null)

        for (let i = 0; i < vals.length; i++) {
            let tag = await TagModel.findOne({where: {name: vals[i]}})

            if (tag) {
                tags[i] = tag
            } else {
                tags[i] = await TagService.create({name: vals[i], user})
            }
        }

        return tags
    }

}

export default MeetupService