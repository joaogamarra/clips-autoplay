import express from 'express'
import getToken from '../services/twitchToken'

//import twitchService from '../services/twitch'

const router = express.Router()

router.get('/:id', (req, res) => {
	console.log(req.params.id)
	console.log(getToken())

	res.send('aok')
	/*const clips = twitchService.getUserClips(req.params.id)

	if (clips) {
		res.send(clips)
	} else {
		res.sendStatus(404)
	}*/
})

export default router