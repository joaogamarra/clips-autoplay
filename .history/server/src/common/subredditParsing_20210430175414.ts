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
			parsedData.data.push({
				embed_url: itemLink,
			})
		}
	})
	return parsedData
}

export const isVideo = (url: string) => {
	const twitchAddress = 'https://clips.twitch.tv/' || 'http://clips.twitch.tv/'
	const twitchEmbed = 'https://clips.twitch.tv/embed?clip='

	if (url.includes(twitchAddress)) {
		const videoId = url.replace(twitchAddress, '')

		return `${twitchEmbed}${videoId}`
	} else {
		return false
	}
}
