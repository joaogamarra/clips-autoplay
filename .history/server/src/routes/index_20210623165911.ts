import { Application } from 'express'
import twitchChannelRouter from './twitch/channel'
import twitchCategoryRouter from './twitch/category'
import twitchUpdateRouter from './twitch/update'
import twitchSuggestionsRouter from './twitch/suggestions'
import subredditRouter from './reddit/subreddit'
import path from 'path'

const initRoutes = (app: Application) => {
	app.use('/api/twitch/channel/', twitchChannelRouter)
	app.use('/api/twitch/category/', twitchCategoryRouter)
	app.use('/api/twitch/update/', twitchUpdateRouter)
	app.use('/api/twitch/suggestions/', twitchSuggestionsRouter)
	app.use('/api/subreddit/', subredditRouter)

	app.get('*', (_req, res) => {
		res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
	})
}

export default initRoutes
