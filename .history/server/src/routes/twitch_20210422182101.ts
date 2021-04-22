import express from 'express'
import getToken from '../services/twitch/token'
import getClips from '../services/twitch/clips'
import getChannel from '../services/twitch/channel'
import getCategory from '../services/twitch/category'
import { apiTimePeriod } from 'src/types/twitch'
import { parseTimePeriod, parseTwitchQuery } from 'src/common/queryParsing'

const router = express.Router()

router.get('/channel/:id', async (req, res) => {
	const query = await parseTwitchQuery(req)

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

export default router
