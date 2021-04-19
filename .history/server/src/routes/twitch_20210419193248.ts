import express from 'express'
import getToken from 'src/services/twitch/token'
import getClips from '../services/twitch/clips'

const router = express.Router()

router.get('/:id', async (_, res) => {
	const token = await getToken()
	const channel = await getChannel()
	const clips = await twitchService.getClips(token)

	res.send(clips)
	/*const clips = twitchService.getUserClips(req.params.id)

	if (clips) {
		res.send(clips)
	} else {
		res.sendStatus(404)
	}*/
})

export default router
