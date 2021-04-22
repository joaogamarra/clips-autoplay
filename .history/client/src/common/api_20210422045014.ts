import axios from 'axios'
import { searchType } from 'src/types/search'
import { TwitchClipsResponse } from 'src/types/twitch'

export const getClips = async (queryId: string, searchMode: searchType, after?: string) => {
	let query = `http://localhost:4000/api/twitch/${searchMode}/${queryId}`

	console.log(query)

	if (after) query = `${query}?after=${after}`

	const { data }: { data: TwitchClipsResponse } = await axios.get(query)

	return data
}
