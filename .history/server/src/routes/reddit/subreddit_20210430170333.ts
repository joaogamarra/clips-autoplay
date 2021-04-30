import getSubreddit from '../../services/reddit/subreddit'
import express from 'express'
import { parseSubreddit } from '@/common/subredditParsing'
import { AxiosResponse } from 'axios'

const router = express.Router()

router.get('/:id', async (req, res) => {
	const data: AxiosResponse = await getSubreddit(req.params.id)
	const dataParsed = await parseSubreddit(data)

	res.send(dataParsed)
})

export default router
