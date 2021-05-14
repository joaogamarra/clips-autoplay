require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import './database/connect'
import initRoutes from './routes'

const app = express()
initRoutes(app)
app.use(express.json())

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
	if (error.message === 'not found' || error.message === 'no clips') {
		res.status(404)
		res.json({ error: error.message })
	} else {
		res.status(500)
		res.json({ error: 'internal server error' })
	}
})

const PORT = 4000

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
