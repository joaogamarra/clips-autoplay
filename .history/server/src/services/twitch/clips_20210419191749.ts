import axios from 'axios'
import { TwitchToken } from '../../types/twitch'

const getClips = async (token: TwitchToken) => {
	const baseUrl = 'https://api.twitch.tv/helix/clips?broadcaster_id=71092938&first=5'

	try {
		if (token && process.env.TWITCH_CLIENT_ID) {
			const res = await axios.get(baseUrl, {
				headers: {
					'Client-Id': process.env.TWITCH_CLIENT_ID,
					Authorization: `Bearer ${token.access_token}`,
				},
			})

			return res.data
		} else {
			throw 'incorrect token or client id'
		}
	} catch (e) {
		console.log(e)
	}
}

export default { getClips }
