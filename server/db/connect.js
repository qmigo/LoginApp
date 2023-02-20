const mongoose = require('mongoose')

const connectDB = (uri)=>{
    mongoose.set('strictQuery',true)
    return mongoose.connect(uri).then(()=>console.log('Db connected'))
}

module.exports = connectDB