import { TwitchChannel, TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getClips = async (token: TwitchToken, channel: TwitchChannel) => {
	const baseUrl = `https://api.twitch.tv/helix/clips?broadcaster_id=${channel.id}&first=5`

	try {
		if (token && process.env.TWITCH_CLIENT_ID) {
			const res = await getResponse(token, baseUrl)

			return res.data
		} else {
			throw 'incorrect token or client id'
		}
	} catch (e) {
		console.log(e)
	}
}

export default getClips
