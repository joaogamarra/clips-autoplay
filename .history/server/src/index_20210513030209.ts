require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express'
import './database/connect'
import initRoutes from './routes'

const app = express()
initRoutes(app)
app.use(express.json())

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
	res.status(error.status || 500).send({
		error: {
			status: error.status || 500,
			message: error.message || 'Internal Server Error',
		},
	})
})

const PORT = 4000

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
