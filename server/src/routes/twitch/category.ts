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

router.get('/:id/shuffle', async (req, res) => {
	const query = parseTwitchQuery(req)
	const token = await getToken()
	const category = await getCategory(token, req.params.id)
	let clips = await getClips(token, undefined, category, query, 100)
	let after = clips.pagination.cursor

	const clipsLoop = async () => {
		if (after) {
			const newClips = await getClips(token, undefined, category, `&after=${after}`, 100)

			after = newClips.pagination.cursor
			clips.pagination.cursor = after
			clips.data = clips.data.concat(newClips.data)

			if (after && clips.data.length < 150) {
				await clipsLoop()
			}
		}
	}

	await clipsLoop()

	const parsedClips = parseTwitchClips(clips)
	await categoryIncreaseRanking(category.name)

	res.send(parsedClips)
})

export default router
