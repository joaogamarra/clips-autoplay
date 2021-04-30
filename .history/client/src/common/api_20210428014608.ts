import axios from 'axios'
import { searchClips, searchType } from 'src/types/search'
import { AutocompleteObj, TwitchClipsResponse } from 'src/types/twitch'
import { addFavourite } from './localstorage'

export const getClips = async (currentSearch: searchClips, after?: string) => {
	let query = `http://localhost:4000/api/twitch/${currentSearch.mode}/${currentSearch.value}?timeperiod=${currentSearch.timePeriod}`

	if (after) query = `${query}&after=${after}`
	console.log(query)
	const { data }: { data: TwitchClipsResponse } = await axios.get(query)

	if (!after) {
		addFavourite(currentSearch)
	}

	return data
}

export const getSuggestions = async (searchMode: searchType, query?: string) => {
	let modeQuery
	searchMode === searchType.category ? (modeQuery = 'categoriesauto') : (modeQuery = 'channelsauto')

	let baseUrl = `http://localhost:4000/api/twitch/${modeQuery}/`

	if (query) baseUrl = `${baseUrl}${query}`

	const data: AutocompleteObj[] = await axios.get(baseUrl)

	console.log(data)

	return data
}
