import express from 'express'
import getToken from '../services/twitch/token'
import getClips from '../services/twitch/clips'
import getChannel from '../services/twitch/channel'
import getCategory from '../services/twitch/category'
import { parseTwitchQuery } from '../common/queryParsing'
import saveStreams from '../services/twitch/streams'
import {
	categoriesAuto,
	channelsAuto,
	channelIncreaseRanking,
	categoryIncreaseRanking,
	channelsDefault,
	categoriesDefault,
} from '../database/queries/twitchSuggestions'
import saveCategories from '../services/twitch/categories'

const router = express.Router()

router.get('/channel/:id', async (req, res) => {
	const query = await parseTwitchQuery(req)

	console.log(query)

	const token = await getToken()
	const channel = await getChannel(token, req.params.id)
	const clips = await getClips(token, channel, undefined, query)

	res.send(clips)
	channelIncreaseRanking(channel)
})

router.get('/category/:id', async (req, res) => {
	const query = await parseTwitchQuery(req)

	const token = await getToken()
	const category = await getCategory(token, req.params.id)
	const clips = await getClips(token, undefined, category, query)

	res.send(clips)
	categoryIncreaseRanking(category.name)
})

router.get('/channelsauto/', async (_, res) => {
	const suggestions = await channelsDefault()

	res.send(suggestions)
})

router.get('/channelsauto/:id', async (req, res) => {
	const autocomplete = await channelsAuto(req.params.id)

	res.send(autocomplete)
})

router.get('/categoriesauto//', async (_, res) => {
	const suggestions = await categoriesDefault()

	res.send(suggestions)
})

router.get('/categoriesauto/:id', async (req, res) => {
	const autocomplete = await categoriesAuto(req.params.id)

	res.send(autocomplete)
})

router.get('/update/streams', async (_, res) => {
	const token = await getToken()
	const streams = await saveStreams(token)
	let after = streams.pagination.cursor

	const streamsLoop = async () => {
		if (after) {
			const newStreams = await saveStreams(token, after)

			after = newStreams.pagination.cursor

			if (newStreams.data[0].viewer_count > 100) {
				streamsLoop()
			}
		}
	}
	streamsLoop()

	res.send(streams)
})

router.get('/update/categories', async (_, res) => {
	const token = await getToken()
	const categories = await saveCategories(token)
	let after = categories.pagination.cursor

	const categoriesLoop = async () => {
		if (after) {
			const newCategories = await saveCategories(token, after)

			after = newCategories.pagination.cursor

			if (after) {
				categoriesLoop()
			}
		}
	}
	categoriesLoop()

	res.send(categories)
})

export default router
