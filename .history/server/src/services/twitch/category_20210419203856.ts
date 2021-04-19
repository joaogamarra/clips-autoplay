import { TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getCategory = async (token: TwitchToken, category: string) => {
	const baseUrl = `https://api.twitch.tv/helix/games?name=${category}`

	if (token && process.env.TWITCH_CLIENT_ID) {
		const res = await getResponse(token, baseUrl)

		return res.data.data[0]
	} else {
		throw 'incorrect token or client id'
	}
}

export default getCategory
