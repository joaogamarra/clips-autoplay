import { TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getCategory = async (token: TwitchToken, category: string) => {
	const baseUrl = `https://api.twitch.tv/helix/games?name=${category}`

	const res = await getResponse(token, baseUrl)

	if (res) {
		const data = res.data.data[0]
		if (data) {
			return data
		} else {
			throw new Error('not found')
		}
	} else {
		throw new Error('not found')
	}
}

export default getCategory
