import express from 'express'
//import cors from 'cors'
const app = express()
//app.use(cors())
app.use(express.json())

const PORT = 4000

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here')
	res.send('pong')
})

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
