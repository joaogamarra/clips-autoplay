import { subredditsAutoComplete, subredditsDefault } from '../../database/queries/redditAutoComplete'
import express from 'express'

const router = express.Router()

router.get('/', async (_, res) => {
	const suggestions = await subredditsDefault()

	res.send(suggestions)
})

router.get('/:id', async (req, res) => {
	const suggestions = await subredditsAutoComplete(req.params.id)

	res.send(suggestions)
})

export default router
