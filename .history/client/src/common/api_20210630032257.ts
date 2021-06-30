import axios from 'axios'
import { searchClips, searchType } from 'src/types/search'
import { AutocompleteObj, ResponseClips } from 'src/types/twitch'

export const getClips = async (search: searchClips, after?: string) => {
	let query

	if (search.mode === searchType.subreddit) {
		query = `${process.env.API_URI}/api/${search.mode}/livestreamfail?timeperiod=${search.timePeriod}&sort=${search.value}`
	} else {
		query = `${process.env.API_URI}/api/twitch/${search.mode}/${search.value}?timeperiod=${search.timePeriod}`
	}
	if (after) query = `${query}&after=${after}`
	try {
		const { data }: { data: ResponseClips } = await axios.get(query)

		return data
	} catch ({ response }) {
		return {
			error: {
				status: response.status,
				message: response.statusText,
			},
		}
	}
}

export const getSuggestions = async (searchMode: searchType, query?: string) => {
	if (searchMode !== searchType.subreddit) {
		let baseUrl = `${process.env.API_URI}/api/twitch/suggestions/${searchMode}/`

		if (query) baseUrl = `${baseUrl}${query}`

		const { data }: { data: AutocompleteObj[] } = await axios.get(baseUrl)

		return data
	} else {
		return false
	}
}
