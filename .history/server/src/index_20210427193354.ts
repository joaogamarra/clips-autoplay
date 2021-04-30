require('dotenv').config()
import express from 'express'
import './database/connect'
import initRoutes from './routes'

const app = express()
initRoutes(app)
app.use(express.json())

const PORT = 4000

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
