import express from 'express'
import getToken from '../services/twitch/token'
import getClips from '../services/twitch/clips'
import getChannel from '../services/twitch/channel'

const router = express.Router()

router.get('/:id', async (req, res) => {
	const token = await getToken()
	const channel = await getChannel(token, req.params.id)
	console.log(await channel)
	const clips = await getClips(token)

	res.send(clips)
	/*const clips = twitchService.getUserClips(req.params.id)

	if (clips) {
		res.send(clips)
	} else {
		res.sendStatus(404)
	}*/
})

export default router