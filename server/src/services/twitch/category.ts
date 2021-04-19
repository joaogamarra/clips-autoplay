import { TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getCategory = async (token: TwitchToken, category: string) => {
	const baseUrl = `https://api.twitch.tv/helix/games?name=${category}`

	const res = await getResponse(token, baseUrl)

	if (res) {
		return res.data.data[0]
	} else {
		return false
	}
}

export default getCategory
