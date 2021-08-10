import { getSubreddit } from '../services/reddit/subreddit'
import { responseClips } from '../types/response'

export const parseSubreddit = async (data: any) => {
	const parsedData: responseClips = {
		data: [],
		pagination: {
			cursor: ''
		}
	}

	if (data.after) parsedData.pagination.cursor = data.after

	data.children?.map(async (item: { data: any }) => {
		let url = ''
		const twitchPath = item.data?.media?.oembed?.thumbnail_url
		let redditPath = item.data?.media?.reddit_video?.fallback_url
		if (!redditPath && item.data?.crosspost_parent_list)
			redditPath = item.data?.crosspost_parent_list[0].media?.reddit_video?.fallback_url

		if (twitchPath) url = twitchPath
		else if (redditPath) url = redditPath

		if (url !== '') {
			const itemLink = isVideo(url)

			if (itemLink && twitchPath) {
				parsedData.data.push({
					title: item.data.title,
					video_url: itemLink,
					twitch_url: item.data.url,
					comments_url: item.data.permalink
				})
			} else if (itemLink && redditPath) {
				parsedData.data.push({
					title: item.data.title,
					video_url: itemLink,
					audio_url: `${itemLink.substr(0, itemLink.lastIndexOf('_') + 1)}audio.mp4`,
					comments_url: item.data.permalink
				})
			}
		}
	})

	await Promise.all(
		parsedData.data.map(async (item) => {
			const commentsList = []
			const comments = await getSubreddit(
				`${item.comments_url?.replace('/r/', '')}.json?sort=top&limit=15`,
				2000
			)

			const commentsArr = comments[1]?.data?.children

			if (commentsArr && commentsArr.length > 0) {
				let i = 0
				while (commentsList.length < 10 && i < commentsArr.length) {
					const commentData = commentsArr[i].data
					if (!commentData.distinguished && commentData.body && commentData.body !== '[deleted]') {
						commentsList.push({
							comment: commentData.body.replace('&gt;', ''),
							author: commentData.author,
							score: commentData.score
						})
						if (commentData.replies) {
							const replieData = commentData.replies.data?.children[0]?.data

							if (replieData.body && commentData.body !== '[deleted]') {
								commentsList.push({
									comment: replieData.body.replace('&gt;', ''),
									author: replieData.author,
									score: replieData.score
								})
							}
						}

						item.comments = commentsList
					}
					i++
				}
			}
		})
	)

	return parsedData
}

export const isVideo = (url: string) => {
	const twitchAddress = 'https://clips-media-assets2.twitch.tv' || 'http://clips-media-assets2.twitch.tv'
	const redditAddress = 'https://v.redd.it' || 'http://v.redd.it'

	if (url && url.includes(twitchAddress)) {
		return url.replace('-social', '').replace('-preview.jpg', '.mp4')
	} else if (url && url.includes(redditAddress)) {
		return url.replace('?source=fallback', '')
	} else {
		return false
	}
}
