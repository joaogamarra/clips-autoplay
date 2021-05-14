import { TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getChannel = async (token: TwitchToken, channel: string, next: any) => {
	const baseUrl = `https://api.twitch.tv/helix/users?login=${channel}`

	const res = await getResponse(token, baseUrl)
	if (res) {
		const data = res.data.data[0]
		if (data) {
			return data
		} else {
			throw new Error('channel not found')
		}
	} else {
		console.log('channnnnel not found')
		return false
	}
}

export default getChannel
