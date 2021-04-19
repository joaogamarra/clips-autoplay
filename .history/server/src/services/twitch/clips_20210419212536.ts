import { TwitchCategory, TwitchChannel, TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getClips = async (token: TwitchToken, channel?: TwitchChannel, category?: TwitchCategory) => {
	let baseUrl = `https://api.twitch.tv/helix/clips?broadcaster_id=${channel?.id}&first=5`

	if (category) {
		baseUrl = `https://api.twitch.tv/helix/clips?game_id=${category.id}&first=5`
	}

	console.log(baseUrl)

	const res = await getResponse(token, baseUrl)

	if (res) {
		return res.data
	} else {
		return false
	}
}

export default getClips
