import express from 'express'
import getToken from '../services/twitch/token'
import getClips from '../services/twitch/clips'
import getChannel from '../services/twitch/channel'

const router = express.Router()

router.get('/channel/:id', async (req, res) => {
	const token = await getToken()
	const channel = await getChannel(token, req.params.id)
	const clips = await getClips(token, channel)

	res.send(clips)
})

export default router
