import axios from 'axios'
import { TwitchToken } from '../../types/twitch'

const getResponse = async (baseUrl: string, token: TwitchToken) => {
	const res = await axios.get(baseUrl, {
		headers: {
			'Client-Id': process.env.TWITCH_CLIENT_ID,
			Authorization: `Bearer ${token.access_token}`,
		},
	})

	return res
}

export default getResponse
