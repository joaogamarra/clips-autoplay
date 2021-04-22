import axios from 'axios'
import { currentSearch } from 'src/types/search'
import { TwitchClipsResponse } from 'src/types/twitch'

export const getClips = async (queryId: string, currentSearch: currentSearch, after?: string) => {
	let query = `http://localhost:4000/api/twitch/${currentSearch.mode}/${queryId}?timeperiod=${currentSearch.timePeriod}`

	if (after) query = `${query}&after=${after}`
	console.log(query)
	const { data }: { data: TwitchClipsResponse } = await axios.get(query)

	return data
}
