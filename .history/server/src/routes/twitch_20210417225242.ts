import express from 'express'

import twitchService from '../services/twitch'

const router = express.Router()

router.get('/:id', (req, res) => {
	res.send(twitchService.getClips())
	/*const clips = twitchService.getUserClips(req.params.id)

	if (clips) {
		res.send(clips)
	} else {
		res.sendStatus(404)
	}*/
})

export default router
