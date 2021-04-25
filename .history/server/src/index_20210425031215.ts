require('dotenv').config()
const mongoose = require('mongoose')
import express from 'express'
//import cors from 'cors'
import twitchRouter from './routes/twitch'

const app = express()
//app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
	console.log('mongo connected')
})

const PORT = 4000

app.use('/api/twitch', twitchRouter)

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here')
	res.send('pong')
})

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
