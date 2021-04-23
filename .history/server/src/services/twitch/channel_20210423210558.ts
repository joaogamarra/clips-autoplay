import { TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getChannel = async (token: TwitchToken, channel: string) => {
	const baseUrl = `https://api.twitch.tv/helix/users?login=${channel}`

	const res = await getResponse(token, baseUrl)

	if (res) {
		console.log(res)
		return res.data.data[0]
	} else {
		return false
	}
}

export default getChannel
