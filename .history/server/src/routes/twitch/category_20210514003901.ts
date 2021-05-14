import { parseTwitchClips } from '../..//common/twitchClipsParsing'
import express from 'express'
import getCategory from '../../services/twitch/category'

import { parseTwitchQuery } from '../../common/queryParsing'
import { categoryIncreaseRanking } from '../../database/queries/twitchAutoComplete'
import getClips from '../../services/twitch/clips'
import getToken from '../../services/twitch/token'

const router = express.Router()

router.get('/:id', async (req, res) => {
	const query = parseTwitchQuery(req)

	const token = await getToken()
	const category = await getCategory(token, req.params.id)
	const clips = await getClips(token, undefined, category, query)
	const parsedClips = parseTwitchClips(clips)

	res.send(parsedClips)
	categoryIncreaseRanking(category.name)
})

export default router
