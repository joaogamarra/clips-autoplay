import express from 'express'
import getToken from 'src/services/twitchToken'

//import twitchService from '../services/twitch'

const router = express.Router()

router.get('/:id', (req) => {
	console.log(req.params.id)
	getToken()
	/*const clips = twitchService.getUserClips(req.params.id)

	if (clips) {
		res.send(clips)
	} else {
		res.sendStatus(404)
	}*/
})

export default router
