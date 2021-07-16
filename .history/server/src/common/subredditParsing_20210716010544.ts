import { getSubreddit } from '@/services/reddit/subreddit'
import { responseClips } from '../types/response'

export const parseSubreddit = (data: any) => {
	const parsedData: responseClips = {
		data: [],
		pagination: {
			cursor: '',
		},
	}

	if (data.after) parsedData.pagination.cursor = data.after

	data.children?.forEach(async (item: { data: any }) => {
		const url = item.data?.media?.oembed?.thumbnail_url
		const commentsList = []
		if (url) {
			const itemLink = isVideo(url)

			if (itemLink) {
				const comments = await getSubreddit(item.data.permalink.replace('/r/'))
				const commentsArr = comments[1]?.data?.children

				if(commentsArr.length > 0) {
					let i = 0
					while(commentsList.length < 5 && i < commentsArr.length) {
						const commentData = commentsArr[i].data
						if(!commentData.distinguished){
							commentsList.push({
								comment: commentData.body,
								author: commentData.author,
								score: commentData.score
							})
						}
						i++
					}
				}
				
				parsedData.data.push({
					title: item.data.title,
					video_url: itemLink,
					twitch_url: item.data.url,
					comments_url: item.data.permalink,
					comments: commentsArr
				})


			}
		}
	})
	return parsedData
}

export const isVideo = (url: string) => {
	const twitchAddress = 'https://clips-media-assets2.twitch.tv' || 'http://clips-media-assets2.twitch.tv'

	if (url && url.includes(twitchAddress)) {
		return url.replace('-social', '').replace('-preview.jpg', '.mp4')
	} else {
		return false
	}
}
