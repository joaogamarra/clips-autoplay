import { TwitchSearch } from '../../database/models/twitch'
import { TwitchStream, TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getStreams = async (token: TwitchToken, after?: string) => {
	const baseUrl = `https://api.twitch.tv/helix/streams?first=3`

	let query = baseUrl

	if (after) query = `${baseUrl}&after=${after}`

	const res = await getResponse(token, query)

	if (res) {
		const data = res.data.data

		data.forEach((stream: TwitchStream) => {
			const search = new TwitchSearch({
				id: stream.user_id,
				login: stream.user_login,
			})
			search.save()
		})

		return res.data
	} else {
		return false
	}
}

export default getStreams
