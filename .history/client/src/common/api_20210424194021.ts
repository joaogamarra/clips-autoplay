import axios from 'axios'
import { currentSearch } from 'src/types/search'
import { AutocompleteObj, TwitchClipsResponse } from 'src/types/twitch'

export const getClips = async (currentSearch: currentSearch, after?: string) => {
	let query = `http://localhost:4000/api/twitch/${currentSearch.mode}/${currentSearch.value}?timeperiod=${currentSearch.timePeriod}`

	if (after) query = `${query}&after=${after}`
	console.log(query)
	const { data }: { data: TwitchClipsResponse } = await axios.get(query)

	return data
}

export const getAutocomplete = async (query: string) => {
	const baseUrl = `http://localhost:4000/api/twitch/autocomplete/${query}`

	const data: AutocompleteObj[] = await axios.get(baseUrl)

	console.log(data)

	return data
}
