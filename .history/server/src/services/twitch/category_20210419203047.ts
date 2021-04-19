import axios from 'axios'
import { TwitchToken } from 'src/types/twitch'

const getCategory = async (token: TwitchToken, category: string) => {
	const baseUrl = `https://api.twitch.tv/helix/games?name=${category}`

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
}

export default getChannel
