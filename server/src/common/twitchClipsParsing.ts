export const parseTwitchClips = (data: any) => {
	let cursor = ''

	if (data.pagination.cursor) cursor = data.pagination.cursor

	const resData = data.data.map((item: any) => {
		const itemLink = item.thumbnail_url.split('-preview-')[0]

		return {
			title: item.title,
			video_url: `${itemLink}.mp4`,
			twitch_url: item.url,
		}
	})

	return {
		data: resData,
		pagination: {
			cursor: cursor,
		},
	}
}
