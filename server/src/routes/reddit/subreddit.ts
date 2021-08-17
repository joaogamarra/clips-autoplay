import { getSubreddit } from '../../services/reddit/subreddit'
import express from 'express'
import { parseSubreddit } from '../../common/subredditParsing'
import { AxiosResponse } from 'axios'
import { parseRedditQuery } from '../../common/queryParsing'
import { subredditIncreaseRanking } from '../../database/queries/redditAutoComplete'

const router = express.Router()

router.get('/:id', async (req, res) => {
	const tries = 3
	let currentTry = 1
	let limit = 50
	let dataParsed

	const requestLoop = async () => {
		const query = parseRedditQuery(req, limit)

		let data: AxiosResponse = await getSubreddit(query)
		if (data) {
			dataParsed = await parseSubreddit(data.data)
			if (dataParsed.data.length === 0 && dataParsed.pagination.cursor && currentTry < tries) {
				currentTry++
				limit = 100
				req.query.after = dataParsed.pagination.cursor
				await requestLoop()
			}
		} else {
			throw new Error('not found')
		}
	}

	await requestLoop()

	await subredditIncreaseRanking(req.params.id)
	res.send(dataParsed)
})

export default router
