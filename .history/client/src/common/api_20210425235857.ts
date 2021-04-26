import axios from 'axios'
import { currentSearch, searchType } from 'src/types/search'
import { AutocompleteObj, TwitchClipsResponse } from 'src/types/twitch'

export const getClips = async (currentSearch: currentSearch, after?: string) => {
	let query = `http://localhost:4000/api/twitch/${currentSearch.searchMode}/${currentSearch.searchValue}?timeperiod=${currentSearch.searchTimePeriod}`

	if (after) query = `${query}&after=${after}`
	console.log(query)
	const { data }: { data: TwitchClipsResponse } = await axios.get(query)

	return data
}

export const getSuggestions = async (searchMode: searchType, query?: string) => {
	let modeQuery
	searchMode === searchType.category ? (modeQuery = 'categoriesauto') : (modeQuery = 'channelsauto')

	const baseUrl = `http://localhost:4000/api/twitch/${modeQuery}/${query && query}`

	const data: AutocompleteObj[] = await axios.get(baseUrl)

	console.log(data)

	return data
}
