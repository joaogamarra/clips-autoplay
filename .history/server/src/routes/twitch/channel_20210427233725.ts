import express from 'express'

import { parseTwitchQuery } from '../../common/queryParsing'
import {
	channelIncreaseRanking,
	channelsAutoComplete,
	channelsDefault,
} from '../../database/queries/twitchAutoComplete'
import getChannel from '../../services/twitch/channel'
import getClips from '../../services/twitch/clips'
import getToken from '../../services/twitch/token'

const router = express.Router()

router.get('/:id', async (req, res) => {
	const query = await parseTwitchQuery(req)

	console.log(query)

	const token = await getToken()
	const channel = await getChannel(token, req.params.id)
	const clips = await getClips(token, channel, undefined, query)

	res.send(clips)
	channelIncreaseRanking(channel)
})

router.get('/autocomplete', async (_, res) => {
	const suggestions = await channelsDefault()

	res.send(suggestions)
})

router.get('/autocomplete/:id', async (req, res) => {
	const autocomplete = await channelsAutoComplete(req.params.id)

	res.send(autocomplete)
})

export default router
