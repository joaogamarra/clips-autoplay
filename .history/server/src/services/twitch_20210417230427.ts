import fetch from 'node-fetch'
import getToken from '../services/twitchToken'

const getClips = async () => {
	const token = getToken()
	const baseUrl = `https://api.twitch.tv/helix/clips?broadcaster_id=1234&first=5`

	try {
		if (token && process.env.TWITCH_CLIENT_ID) {
			console.log(token)
			const res = await fetch(baseUrl, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Client-Id': process.env.TWITCH_CLIENT_ID,
				},
			})

			const json = await res.json()

			return json
		} else {
			throw 'incorrect token or client id'
		}
	} catch (e) {
		console.log(e)
	}
}

export default { getClips }
