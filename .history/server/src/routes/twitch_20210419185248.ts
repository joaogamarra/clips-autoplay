import express from 'express'
import twitchService from '../services/twitch/clips'
import getToken from '../services/twitch/token'

const router = express.Router()

const token = async () => {
	const token = await getToken()

	return token
}

router.get('/:id', async (_, res) => {
	const clips = await twitchService.getClips(token())

	res.send(clips)
	/*const clips = twitchService.getUserClips(req.params.id)

	if (clips) {
		res.send(clips)
	} else {
		res.sendStatus(404)
	}*/
})

export default router
