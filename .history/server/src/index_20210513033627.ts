require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express'
import './database/connect'
import initRoutes from './routes'

const app = express()
initRoutes(app)
app.use(express.json())

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
	if (error.message === 'not found') {
		res.status(404)
		res.json({ error: error.message })
	}
})

const PORT = 4000

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
