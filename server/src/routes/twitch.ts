import express from 'express'
import getToken from '../services/twitch/token'
import getClips from '../services/twitch/clips'
import getChannel from '../services/twitch/channel'
import getCategory from '../services/twitch/category'

const router = express.Router()

router.get('/channel/:id', async (req, res) => {
	let after = ''
	if (typeof req.query.after === 'string') after = `&after=${req.query.after}`

	const token = await getToken()
	const channel = await getChannel(token, req.params.id)
	const clips = await getClips(token, channel, undefined, after)

	res.send(clips)
})

router.get('/category/:id', async (req, res) => {
	let after = ''
	if (typeof req.query.after === 'string') after = `&after=${req.query.after}`

	const token = await getToken()
	const category = await getCategory(token, req.params.id)
	const clips = await getClips(token, undefined, category, after)

	res.send(clips)
})

export default router
