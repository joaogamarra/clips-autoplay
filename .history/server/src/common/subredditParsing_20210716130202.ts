import { getSubreddit } from '../services/reddit/subreddit'
import { responseClips } from '../types/response'

export const parseSubreddit = async (data: any) => {
	const parsedData: responseClips = {
		data: [],
		pagination: {
			cursor: '',
		},
	}

	if (data.after) parsedData.pagination.cursor = data.after

	data.children?.map(async (item: { data: any }) => {
		const url = item.data?.media?.oembed?.thumbnail_url
		if (url) {
			const itemLink = isVideo(url)

			if (itemLink) {
				parsedData.data.push({
					title: item.data.title,
					video_url: itemLink,
					twitch_url: item.data.url,
					comments_url: item.data.permalink,
				})
			}
		}
	})

	await Promise.all(parsedData.data.map(async(item) => {
		const commentsList = []

		const comments = await getSubreddit(`${item.comments_url?.replace('/r/', '')}.json?sort=top&limit=8`)
						
		const commentsArr = comments[1]?.data?.children
	
		if(commentsArr.length > 0) {
			let i = 0
			while(commentsList.length < 5 && i < commentsArr.length) {
				const commentData = commentsArr[i].data
				if(!commentData.distinguished){
					console.log(commentData.body)
					commentsList.push({
						comment: commentData.body,
						author: commentData.author,
						score: commentData.score
					})

					item.comments = commentsList
				}
				i++
			}
		}
		
	}))
		
		
	


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
