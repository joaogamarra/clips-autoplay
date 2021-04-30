import axios from 'axios'
import { searchClips, searchType } from 'src/types/search'
import { SubredditClipsResponse } from 'src/types/subreddit'
import { AutocompleteObj, TwitchClipsResponse } from 'src/types/twitch'
import { addFavourite } from './localstorage'

export const getClips = async (search: searchClips, after?: string) => {
	if (search.mode === searchType.category || searchType.channel) {
		const data = getTwitchClips(search, after)

		return data
	}

	if (search.mode === searchType.subreddit) {
		const data = getSubredditClips(search, after)
	}

	if (!after) addFavourite(search)
}

export const getSuggestions = async (searchMode: searchType, query?: string) => {
	let baseUrl = `http://localhost:4000/api/twitch/suggestions/${searchMode}/`

	if (query) baseUrl = `${baseUrl}${query}`

	const data: AutocompleteObj[] = await axios.get(baseUrl)

	return data
}

const getTwitchClips = async (search: searchClips, after?: string) => {
	let query = `http://localhost:4000/api/twitch/${search.mode}/${search.value}?timeperiod=${search.timePeriod}`

	if (after) query = `${query}&after=${after}`

	const { data }: { data: TwitchClipsResponse } = await axios.get(query)

	return data
}

const getSubredditClips = async (search: searchClips, after?: string) => {
	let query = `http://localhost:4000/api/${search.mode}/${search.value}?timeperiod=${search.timePeriod}`

	if (after) query = `${query}&after=${after}`

	const { data }: { data: SubredditClipsResponse } = await axios.get(query)

	return data
}
