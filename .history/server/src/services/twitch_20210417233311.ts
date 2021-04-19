import axios from 'axios'
import getToken from '../services/twitchToken'

const getClips = async () => {
	const token = await getToken()
	const baseUrl = `https://api.twitch.tv/helix/clips?broadcaster_id=1234&first=5`

	try {
		console.log(token)
		if (token && process.env.TWITCH_CLIENT_ID) {
			const res = await axios.post(baseUrl, {
				headers: {
					Authorization: `Bearer ${token.access_token}`,
					'Client-Id': process.env.TWITCH_CLIENT_ID,
				},
			})

			console.log(res)
		} else {
			throw 'incorrect token or client id'
		}
	} catch (e) {
		console.log(e)
	}
}

export default { getClips }
