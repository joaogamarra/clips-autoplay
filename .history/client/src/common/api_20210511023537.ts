import axios from 'axios'
import { searchClips, searchType } from 'src/types/search'
import { AutocompleteObj, ResponseClips } from 'src/types/twitch'
import { addFavourite } from './localstorage'

export const getClips = async (search: searchClips, after?: string) => {
	if (!after) addFavourite(search)
	let query

	if (search.mode === searchType.subreddit) {
		query = `http://localhost:4000/api/${search.mode}/livestreamfail?timeperiod=${search.timePeriod}`
	} else {
		query = `http://localhost:4000/api/twitch/${search.mode}/${search.value}?timeperiod=${search.timePeriod}`
	}
	console.log(query)
	if (after) query = `${query}&after=${after}`

	const { data }: { data: ResponseClips } = await axios.get(query)

	return data
}

export const getSuggestions = async (searchMode: searchType, query?: string) => {
	console.log(query)
	console.log(searchMode)
	if (searchMode !== searchType.subreddit) {
		let baseUrl = ``

		if (query) baseUrl = `${baseUrl}${query}`

		const { data }: { data: AutocompleteObj[] } = await axios.get(baseUrl)

		return data
	} else {
		return false
	}
}
