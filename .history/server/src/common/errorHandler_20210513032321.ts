import { NextFunction, Response } from 'express'

const errorHandler = (error: any, _req: Request, res: Response, next: NextFunction) => {
	if (error.message === 'not found') {
		res.status(404)
		res.json({ error: error.message })
	}

	next(error)
}

export default errorHandler
