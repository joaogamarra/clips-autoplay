import { Application } from 'express'
import twitchChannelRouter from './twitch/channel'
import twitchCategoryRouter from './twitch/category'
import twitchUpdateRouter from './twitch/update'
import twitchSuggestionsRouter from './twitch/suggestions'
import redditRouter from './reddit/subreddit'

const initRoutes = (app: Application) => {
	app.use('/api/twitch/channel/', twitchChannelRouter)
	app.use('/api/twitch/category/', twitchCategoryRouter)
	app.use('/api/twitch/update/', twitchUpdateRouter)
	app.use('/api/twitch/suggestions/', twitchSuggestionsRouter)
	app.use('/api/subreddit/', redditRouter)
}

export default initRoutes
