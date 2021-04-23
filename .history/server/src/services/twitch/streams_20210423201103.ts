import { TwitchSearch } from '../../database/models/twitch'
import { TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getStreams = async (token: TwitchToken) => {
	const baseUrl = `https://api.twitch.tv/helix/streams?first=5`

	const res = await getResponse(token, baseUrl)

	if (res) {
		const data = res.data.data

		data.forEach((stream) => {
			const search = new TwitchSearch({
				id: stream.user_id,
				login: stream.user_login,
			})
			search.save()
		})

		return res.data.data
	} else {
		return false
	}
}

export default getStreams
