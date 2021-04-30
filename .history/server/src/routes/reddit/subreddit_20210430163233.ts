import getSubreddit from '@/services/reddit/subreddit'
import express from 'express'

const router = express.Router()

router.get('/:id', async (req, res) => {
	const data = await getSubreddit(req.params.id)

	res.send(data)
})

export default router
