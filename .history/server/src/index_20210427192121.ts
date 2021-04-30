require('dotenv').config()
import express from 'express'
import twitchRouter from './routes/twitch'

const app = express()
app.use(express.json())

const PORT = 4000

app.use('/api/twitch', twitchRouter)

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here')
	res.send('pong')
})

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
