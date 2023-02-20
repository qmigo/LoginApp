const CustomAPIError = require('../errors/custom-error')

const errorHandlerMiddleWare = (err, req, res, next)=>{
    let customError = {
        statusCode: err.statusCode||500,
        message: err.message||'Internal Server Error'
    } 
   
    if(err instanceof CustomAPIError)
    {
       customError.statusCode = err.statusCode
       customError.message = err.message
    }
    
    if(err.name === 'ValidationError')
    {
        customError.message = Object.values(err.errors)
        .map((item)=> item.message)
        .join(',')
        customError.statusCode = 400
    }
    if(err.code && err.code === 11000 )
    {   
        
        customError.message = `Duplicate value entered for ${String(Object.keys(err.keyValue)[0])} field, please try with another value`
        customError.statusCode = 400   
    }
    if(err.name === 'CastError') {
        customError.message = `No item found with id : ${err.value}`
        customError.statusCode = 404
    }
    res.status(customError.statusCode).json({msg: customError.message})
}

module.exports = errorHandlerMiddleWare