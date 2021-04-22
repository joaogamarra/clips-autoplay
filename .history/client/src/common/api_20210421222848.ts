import axios from 'axios'
import { TwitchClipsResponse } from 'src/types/twitch'

export const getClips = async (queryId: string, after?: string) => {
	const apiBaseUrl = 'http://localhost:4000/api/twitch/channel/'
	let query = `${apiBaseUrl}${queryId}`
	if (after) query = `${query}&after=${after}`

	const { data }: { data: TwitchClipsResponse } = await axios.get(query)

	return data
}
