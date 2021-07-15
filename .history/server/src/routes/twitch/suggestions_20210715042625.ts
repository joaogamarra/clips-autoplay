import express from 'express'

import {
	channelsAutoComplete,
	channelsDefault,
	categoriesAutoComplete,
	categoriesDefault,
} from '../../database/queries/twitchAutoComplete'

const router = express.Router()

router.get('/channel', async (_, res) => {
	const suggestions = await channelsDefault()
	
	res.send(suggestions)
})

router.get('/channel/:id', async (req, res) => {
	const suggestions = await channelsAutoComplete(req.params.id)

	res.send(suggestions)
})

router.get('/category', async (_, res) => {
	const suggestions = await categoriesDefault()

	res.send(suggestions)
})

router.get('/category/:id', async (req, res) => {
	const suggestions = await categoriesAutoComplete(req.params.id)

	res.send(suggestions)
})

export default router
