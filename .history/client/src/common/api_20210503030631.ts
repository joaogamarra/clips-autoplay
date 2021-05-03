import axios from 'axios'
import { searchClips, searchType } from 'src/types/search'
import { AutocompleteObj, ResponseClips } from 'src/types/twitch'
import { addFavourite } from './localstorage'

export const getClips = async (search: searchClips, after?: string) => {
	if (!after) addFavourite(search)
	let twitchPrefix = ''

	if (search.mode === searchType.channel || search.mode === searchType.category) twitchPrefix = 'twitch/'

	let query = `http://localhost:4000/api/${twitchPrefix}${search.mode}/${search.value}?timeperiod=${search.timePeriod}`

	if (after) query = `${query}&after=${after}`

	console.log(query)

	const { data }: { data: ResponseClips } = await axios.get(query)

	return data
}

export const getSuggestions = async (searchMode: searchType, query?: string) => {
	let baseUrl = `http://localhost:4000/api/twitch/suggestions/${searchMode}/`

	if (query) baseUrl = `${baseUrl}${query}`

	const data: AutocompleteObj[] = await axios.get(baseUrl)

	return data
}
