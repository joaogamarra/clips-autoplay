import express from 'express'
import getToken from '../services/twitch/token'
import getClips from '../services/twitch/clips'
import getChannel from '../services/twitch/channel'

const router = express.Router()

router.get('/channel/:id', async (req, res) => {
	const token = await getToken()
	const channel = await getChannel(token, req.params.id)
	if (channel) {
		const clips = await getClips(token, channel)
		res.send(clips)
	} else {
		res.sendStatus(404)
	}

	/*const clips = twitchService.getUserClips(req.params.id)

	if (clips) {
		res.send(clips)
	} else {
		res.sendStatus(404)
	}*/
})

export default router
