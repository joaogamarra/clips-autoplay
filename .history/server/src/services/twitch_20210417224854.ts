import fetch from 'node-fetch'
import getToken from '../services/twitchToken'

let accessToken: string | null = null
const token = async () => {
	accessToken = await getToken()
}

const getClips = async () => {
	const baseUrl = `https://api.twitch.tv/helix/clips?broadcaster_id=1234&first=5`

	try {
		if (accessToken && process.env.TWITCH_CLIENT_ID) {
			console.log(accessToken)
			const res = await fetch(baseUrl, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Client-Id': process.env.TWITCH_CLIENT_ID,
				},
			})

			console.log(await res.json())

			return await res.json()
		} else {
			throw 'incorrect token or client id'
		}
	} catch (e) {
		console.log(e)
	}
}

export default { getClips }
