const jsonwebtoken = require('jsonwebtoken')
const { CustomAPIError } = require('../../../JobsAPI/errors')

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer '))
    throw new CustomAPIError('Not valid authorization header',401)
    const token = authHeader.split(' ')[1]
    
    try {
        const payLoad = jsonwebtoken.verify(token, 'secret')
        req.user = { userId:payLoad.userId }
        next()
    } catch (error) {
        console.log(error)
        throw new CustomAPIError('Unauthenticated',401)
    }
}

module.exports = authMiddleware