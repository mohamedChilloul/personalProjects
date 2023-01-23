import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'


const app = express()
dotenv.config()
app.use(cors())
app.use(bodyParser.json({
    limit : '30mb',
    extended : 'true'
}))
app.use(bodyParser.urlencoded({
    limit : '30mb',
    extended : 'true'
}))
app.use('/posts', postRoutes)
app.use('/users', userRoutes)




const MONGODB_URL = process.env.MONGO_URI
const PORT = process.env.PORT || 6000

mongoose.connect(MONGODB_URL, {useNewUrlParser : true, useUnifiedTopology : true})
.then(
    () => {
        console.log('connected to DB')
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
        })
    }
).catch(err => {
    console.log(err.message)
})

