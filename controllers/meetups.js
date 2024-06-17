const Meetup = require('../models/meetup')
const Tag = require('../models/tag')

module.exports = {
    create: async (req, res) => {
        let {name, description, time, place, tags} = req.body
        let user = await req.user
        
        let meetup = await Meetup.create({name, description, time, place, tags})

        if (!!tags && tags.length != 0) {
            for (let i = 0; i < tags.length; i++) {
                tags[i] = await Tag.findByPk(+tags[i])
            }

            await meetup.addTags(tags)
        }

        await meetup.setUser(user)

        res.json({meetup})
    },
    update: async (req, res) => {
        let id = +req.params.id
        let {name, description, time, place, tags} = req.body
        let meetup = await Meetup.findByPk(id)

        await meetup.update({name, description, time, place})

        if (!!tags && tags.length != 0) {
            for (let i = 0; i < tags.length; i++) {
                tags[i] = await Tag.findByPk(+tags[i])
            }

            await meetup.setTags(tags)
        }

        res.send(200) 
        
    },
    delete: async (req, res) => {
        let id = +req.params.id

        await Meetup.destroy({where: {id: id}});
        
        res.send(200) 
    },
    get: async (req, res) => {
        let id = +req.params.id
        let meetup = await Meetup.findByPk(id, {
            include: Tag
        })

        res.json({meetup})
    },
    getAll: async (req, res) => {
        try { 
            let sortFields = [["nameSort", req.query.nameSort], ["descriptionSort", req.query.descriptionSort], ["timeSort", req.query.timeSort], ["placeSort", req.query.placeSort]]
            let filterFields = [["name", req.query.name], ["description", req.query.description], ["time", req.query.time], ["place", req.query.place]]
            let offset = req.query.offset, limit = req.query.limit

            sortFields = sortFields.map(field => [field[0].split("Sort")[0], field[1]]).filter(field => !!field[1])
            filterFields = Object.fromEntries(filterFields.filter(field => field[1]))

            let meetups = await Meetup.findAll({
                include: Tag,
                order: sortFields,
                limit,
                offset,
                where: filterFields
            });

            res.json({meetups})
        } catch {
            res.send(400)
        }
    }
}

