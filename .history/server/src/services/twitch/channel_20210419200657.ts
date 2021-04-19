import axios from 'axios'
import { TwitchToken } from 'src/types/twitch'

const getChannel = async (token: TwitchToken, channel: string) => {
	const baseUrl = `https://api.twitch.tv/helix/users?login=${channel}`

	try {
		if (token && process.env.TWITCH_CLIENT_ID) {
			const res = await axios.get(baseUrl, {
				headers: {
					'Client-Id': process.env.TWITCH_CLIENT_ID,
					Authorization: `Bearer ${token.access_token}`,
				},
			})

			return res.data.data[0]
		} else {
			throw 'incorrect token or client id'
		}
	} catch (e) {
		console.log(e)
	}
}

export default getChannel
