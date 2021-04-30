import { redditClips } from '../types/reddit'
import { AxiosResponse } from 'axios'

export const parseSubreddit = (data: AxiosResponse) => {
	let parsedData: redditClips = {
		data: [],
		pagination: {
			cursor: '',
		},
	}

	console.log(data.after)

	return data
}
