require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express'
import errorHandler from './common/errorHandler'
import './database/connect'
import initRoutes from './routes'

const app = express()
initRoutes(app)
app.use(express.json())

app.use(errorHandler)

const PORT = 4000

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
