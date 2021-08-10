import axios from 'axios'
import { TwitchToken } from '../../types/twitch'

const getResponse = async (token: TwitchToken, baseUrl: string) => {
	try {
		if (token && process.env.TWITCH_CLIENT_ID) {
			const res = await axios.get(encodeURI(baseUrl), {
				headers: {
					'Client-Id': process.env.TWITCH_CLIENT_ID,
					Authorization: `Bearer ${token.access_token}`
				}
			})

			return res
		} else {
			throw 'incorrect token or client id'
		}
	} catch (e) {
		console.log(e)
		return false
	}
}

export default getResponse
