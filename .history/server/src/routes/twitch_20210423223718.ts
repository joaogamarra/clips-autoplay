import express from 'express'
import getToken from '../services/twitch/token'
import getClips from '../services/twitch/clips'
import getChannel from '../services/twitch/channel'
import getCategory from '../services/twitch/category'
import { parseTwitchQuery } from '../common/queryParsing'
import saveStreams from '../services/twitch/streams'
import twitchAutocomplete from '@/database/queries/twitchAutocomplete'

const router = express.Router()

router.get('/channel/:id', async (req, res) => {
	const query = await parseTwitchQuery(req)

	console.log(query)

	const token = await getToken()
	const channel = await getChannel(token, req.params.id)
	const clips = await getClips(token, channel, undefined, query)

	res.send(clips)
})

router.get('/category/:id', async (req, res) => {
	const query = await parseTwitchQuery(req)

	const token = await getToken()
	const category = await getCategory(token, req.params.id)
	const clips = await getClips(token, undefined, category, query)

	res.send(clips)
})

router.get('/autocomplete/:id', async (req, res) => {
	const autocomplete = await twitchAutocomplete(req.params.id)

	res.send(autocomplete)
})

router.get('/streams/update/', async (_, res) => {
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

export default router