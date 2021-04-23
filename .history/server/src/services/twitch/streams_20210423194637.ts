import { TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getStreams = async (token: TwitchToken) => {
	const baseUrl = `https://api.twitch.tv/helix/streams`

	const res = await getResponse(token, baseUrl)

	if (res) {
		return res.data
	} else {
		return false
	}
}

export default getStreams
