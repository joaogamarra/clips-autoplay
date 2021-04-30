import { redditClips } from '../types/reddit'

export const parseSubreddit = (data: any) => {
	const parsedData: redditClips = {
		data: [],
		pagination: {
			cursor: '',
		},
	}

	if (data.after) parsedData.pagination.cursor = data.after

	data.children?.forEach((item: { data: any }) => {
		const itemLink = isVideo(item.data.url)

		if (itemLink) {
			parsedData.data.concat({
				embed_url: itemLink,
			})
		}
	})

	console.log(parsedData)

	return data
}

export const isVideo = (url: string) => {
	const twitchAddress = 'https://clips.twitch.tv/' || 'http://clips.twitch.tv/'
	const twitchEmbed = 'https://clips.twitch.tv/embed?clip='

	console.log(url)

	if (url.includes(twitchAddress)) {
		const videoId = url.replace(twitchAddress, '')

		return `${twitchEmbed}${videoId}`
	} else {
		return false
	}
}
