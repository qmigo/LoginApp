require('express-async-errors')
require('dotenv').config()

const express = require('express');
const app = express()
const cors = require('cors')
const connectDB = require('./db/connect')
const router = require('./routes/route')
const errorHandlerMiddleWare = require('./middleware/error-handler')

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use('/api/v1',router)
app.use(errorHandlerMiddleWare)

const start = async()=>{
    try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, ()=>{
        console.log(`Server listening at http://localhost:${port}`)
    })
        
    } catch (error) {
        console.log(error)    
    }
}
start()