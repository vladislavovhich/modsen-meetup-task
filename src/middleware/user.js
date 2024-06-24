const {StatusCodes} = require("http-status-codes")

const checkRole = (requiredRoles) => async (req, res, next) => {
    let user = await req.user

    if (user && requiredRoles.includes(user.roleId)) {
        return next()
    } else {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access denied. Insufficient permissions.' })
    }
}

const ownsResource = (resourceModel) => async (req, res, next) => {
    try {
        let user = await req.user
        let resourceId = req.params.id
        let item = await resourceModel.findByPk(resourceId)
        
        if (user && user.id == item.userId) {
            return next()
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access denied. Insufficient permissions.' })
        }
    } catch (error) {
        next(error)
    }
}

  module.exports = {checkRole, ownsResource}