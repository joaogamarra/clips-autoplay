import express from 'express'

import { parseTwitchQuery } from '../../common/queryParsing'
import { parseTwitchClips } from '../../common/twitchClipsParsing'
import { channelIncreaseRanking } from '../../database/queries/twitchAutoComplete'
import getChannel from '../../services/twitch/channel'
import getClips from '../../services/twitch/clips'
import getToken from '../../services/twitch/token'

const router = express.Router()

router.get('/:id', async (req, res) => {
	const query = parseTwitchQuery(req)

	console.log(query)

	const token = await getToken()
	const channel = await getChannel(token, req.params.id)
	const clips = await getClips(token, channel.data, undefined, query)
	const parsedClips = parseTwitchClips(clips)

	res.send(parsedClips)
	channelIncreaseRanking(channel)
})

export default router
