import getSubreddit from '../../services/reddit/subreddit'
import express from 'express'
import { parseSubreddit } from '../../common/subredditParsing'
import { AxiosResponse } from 'axios'
import { parseRedditQuery } from '../../common/queryParsing'

const router = express.Router()

router.get('/livestreamfail', async (req, res) => {
	const query = parseRedditQuery(req)
	const data: AxiosResponse = await getSubreddit(query)
	if (data) {
		const dataParsed = parseSubreddit(data)

		res.send(dataParsed)
	} else {
		res.status(404).end()
	}
})

export default router
