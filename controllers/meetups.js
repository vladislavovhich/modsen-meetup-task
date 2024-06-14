const Meetup = require('../models/meetup')
const Tag = require('../models/tag')

module.exports = {
    create: async (req, res) => {
        let {name, description, time, place, tags} = req.body
        
        let meetup = await Meetup.create({name, description, time, place, tags})

        if (!!tags && tags.length != 0) {
            for (let i = 0; i < tags.length; i++) {
                tags[i] = await Tag.findByPk(+tags[i])
            }

            await meetup.addTags(tags)
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({meetup}));
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

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({meetup}));
    },
    getAll: async (req, res) => {
        let meetups = await Meetup.findAll({
            include: Tag
        });

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({meetups}));
    }
}

