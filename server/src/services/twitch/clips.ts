import { TwitchCategory, TwitchChannel, TwitchToken } from '../../types/twitch'
import getResponse from './service'

const getClips = async (
	token: TwitchToken,
	channel?: TwitchChannel,
	category?: TwitchCategory,
	query?: string,
	limit?: number
) => {
	let searchType = `broadcaster_id=${channel?.id}`
	const queryLimit = limit ? limit : 50
	if (category) searchType = `game_id=${category?.id}`

	const baseUrl = `https://api.twitch.tv/helix/clips?${searchType}${query}&first=${queryLimit}`

	const res = await getResponse(token, baseUrl)

	if (res) {
		const data = res.data
		if (data && data.data.length > 0) {
			return data
		} else {
			throw new Error('no clips')
		}
	} else {
		throw new Error('no clips')
	}
}

export default getClips
