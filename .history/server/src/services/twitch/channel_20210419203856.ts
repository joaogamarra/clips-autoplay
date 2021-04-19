import { TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getChannel = async (token: TwitchToken, channel: string) => {
	const baseUrl = `https://api.twitch.tv/helix/users?login=${channel}`

	if (token && process.env.TWITCH_CLIENT_ID) {
		const res = await getResponse(token, baseUrl)

		return res.data.data[0]
	} else {
		throw 'incorrect token or client id'
	}
}

export default getChannel
