const Tag = require('../models/tag')

module.exports = {
    create: async (req, res) => {
        // #swagger.tags = ['Tag']

        let {name} = req.body
        let user = await req.user

        let tag = await Tag.create({name})

        await tag.setUser(user)

        res.json({tag});
    },
    update: async (req, res) => {
        // #swagger.tags = ['Tag']

        let id = +req.params.id
        let {name} = req.body

        await Tag.update({name}, {where: {id: id}})

        res.send(200) 
    },
    delete: async (req, res) => {
        // #swagger.tags = ['Tag']
        
        let id = +req.params.id

        await Tag.destroy({where: {id: id}});
        
        res.send(200) 
    },
    get: async (req, res) => {
        // #swagger.tags = ['Tag']

        let id = +req.params.id
        let tag = await Tag.findByPk(id)

        res.json({tag})
    },
    getAll: async (req, res) => {
        // #swagger.tags = ['Tag']
        
        let tags = await Tag.findAll();

        res.json({tags});
    }
}

