import { TwitchCategory, TwitchChannel, TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getClips = async (token: TwitchToken, channel?: TwitchChannel, category?: TwitchCategory) => {
	let searchType = 'broadcaster_id'
	if (category) searchType = 'game_id'

	const baseUrl = `https://api.twitch.tv/helix/clips?${searchType}=${channel?.id}&first=5`

	console.log(baseUrl)

	const res = await getResponse(token, baseUrl)

	if (res) {
		return res.data
	} else {
		return false
	}
}

export default getClips
