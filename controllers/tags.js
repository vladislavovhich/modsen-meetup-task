const Tag = require('../models/tag')

module.exports = {
    create: async (req, res) => {
        let {name} = req.body

        let tag = await Tag.create({name})

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({tag}));
    },
    update: async (req, res) => {
        let id = +req.params.id
        let {name} = req.body

        await Tag.update({name}, {where: {id: id}})

        res.send(200) 
    },
    delete: async (req, res) => {
        let id = +req.params.id

        await Tag.destroy({where: {id: id}});
        
        res.send(200) 
    },
    get: async (req, res) => {
        let id = +req.params.id
        let tag = await Tag.findByPk(id)

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({tag}));
    },
    getAll: async (req, res) => {
        let tags = await Tag.findAll();

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({tags}));
    }
}

