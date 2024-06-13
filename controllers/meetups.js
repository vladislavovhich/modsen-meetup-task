const Meetup = require('../models/meetup')

module.exports = {
    create: async (req, res) => {
        let {name, description, time, place} = req.body

        let meetup = await Meetup.create({name, description, time, place})

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({meetup}));
    },
    update: async (req, res) => {
        let id = +req.params.id
        let {name, description, time, place} = req.body

        await Meetup.update({name, description, time, place}, {where: {id: id}})

        res.send(200) 
    },
    delete: async (req, res) => {
        let id = +req.params.id

        await Meetup.destroy({where: {id: id}});
        
        res.send(200) 
    },
    get: async (req, res) => {
        let id = +req.params.id
        let meetup = await Meetup.findByPk(id)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({meetup}));
    },
    getAll: async (req, res) => {
        let meetups = await Meetup.findAll();

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({meetups}));
    }
}

