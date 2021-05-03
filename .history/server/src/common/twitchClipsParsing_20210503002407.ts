import { responseClips } from '../types/response'

export const parseTwitchClips = (data: any) => {
	const parsedData: responseClips = {
		data: [],
		pagination: {
			cursor: '',
		},
	}

	if (data.pagination.cursor) parsedData.pagination.cursor = data.pagination.cursor

	data.forEach((item: any) => {
		const itemLink = item.thumbnail_url.split('-preview-')[0]

		parsedData.data.push({
			title: item.title,
			video_url: `${itemLink}.mp4`,
		})
	})
	return parsedData
}
