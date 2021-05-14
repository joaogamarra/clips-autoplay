import { TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getChannel = async (token: TwitchToken, channel: string) => {
	const baseUrl = `https://api.twitch.tv/helix/users?login=${channel}`

	const res = await getResponse(token, baseUrl)

	console.log(res)
	if (res) {
		return res.data.data[0]
	} else {
		console.log('channnnnel not found')
		return false
	}
}

export default getChannel
