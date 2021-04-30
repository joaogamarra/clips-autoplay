import { Application } from 'express'
import twitchRouter from './twitch'

const initRoutes = (app: Application) => {
	app.use('/api/twitch', twitchRouter)
}

export default initRoutes
