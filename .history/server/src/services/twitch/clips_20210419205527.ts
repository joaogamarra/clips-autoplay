import { TwitchChannel, TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getClips = async (
	token: TwitchToken,
	type: 'category' | 'channel',
	channel?: TwitchChannel,
	category: TwitchCategory
) => {
	const baseUrl = `https://api.twitch.tv/helix/clips?broadcaster_id=${channel.id}&first=5`

	const res = await getResponse(token, baseUrl)

	if (res) {
		return res.data
	} else {
		return false
	}
}

export default getClips
