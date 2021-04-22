import axios from 'axios'
import { TwitchClipsResponse } from 'src/types/twitch'

export const getClips = async (queryId: string) => {
	const apiBaseUrl = 'http://localhost:4000/api/twitch/channel/'

	const { data }: { data: TwitchClipsResponse } = await axios.get(`${apiBaseUrl}${queryId}`)

	return data
}
