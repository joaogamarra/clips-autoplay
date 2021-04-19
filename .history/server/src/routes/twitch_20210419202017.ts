import express from 'express'
import getToken from '../services/twitch/token'
import getClips from '../services/twitch/clips'
import getChannel from '../services/twitch/channel'

const router = express.Router()

router.get('/channel/:id', async (req, res) => {
	const token = await getToken()
	if (!token) {
		res.sendStatus(400).send('unable to get Token')
		return false
	}

	const channel = await getChannel(token, req.params.id)
	if (!channel) {
		res.sendStatus(404).send('channel not found')
		return false
	}

	const clips = await getClips(token, channel)
	if (!clips) res.sendStatus(404).send('channel has no clips')

	res.send(clips)

	/*const clips = twitchService.getUserClips(req.params.id)

	if (clips) {
		res.send(clips)
	} else {
		res.sendStatus(404)
	}*/
})

export default router
