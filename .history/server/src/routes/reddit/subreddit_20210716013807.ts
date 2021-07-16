import {getSubreddit} from '../../services/reddit/subreddit'
import express from 'express'
import { parseSubreddit } from '../../common/subredditParsing'
import { AxiosResponse } from 'axios'
import { parseRedditQuery } from '../../common/queryParsing'

const router = express.Router()

router.get('/:id', async (req, res) => {
	const query = parseRedditQuery(req)

	const data: AxiosResponse = await getSubreddit(query)
	console.log(data.data.children)
	if (data) {
		const dataParsed = await parseSubreddit(data.data)

		res.send(dataParsed)
	} else {
		throw new Error('not found')
	}
})

export default router
