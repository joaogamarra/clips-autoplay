import { Application } from 'express'
import twitchChannelRouter from './twitch/channel'
import twitchCategoryRouter from './twitch/category'
import twitchUpdateRouter from './twitch/update'

const initRoutes = (app: Application) => {
	app.use('/api/twitch/channel/', twitchChannelRouter)
	app.use('/api/twitch/category/', twitchCategoryRouter)
	app.use('/api/twitch/update/', twitchUpdateRouter)
}

export default initRoutes
