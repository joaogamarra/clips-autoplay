require('dotenv').config()
import path from 'path'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'

import './database/connect'
import initRoutes from './routes'

const app = express()
app.use(cors())
initRoutes(app)
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../build')))

app.get('*', (_req, res) => {
	console.log(path.resolve(__dirname))
	res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
