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
		let url: string | false = ''
		const twitchPath = item.data?.media?.oembed?.thumbnail_url
		let redditPath = item.data?.media?.reddit_video?.fallback_url
		if (!redditPath && item.data?.crosspost_parent_list)
			redditPath = item.data?.crosspost_parent_list[0]?.media?.reddit_video?.fallback_url
		const redditGifPath = item.data?.preview?.images[0]?.variants?.mp4?.source?.url
		const redditGifDirect = item.data?.preview?.reddit_video_preview?.fallback_url
		let gifPath = item.data?.url_overridden_by_dest

		if (!gifPath?.endsWith('.gif')) gifPath = false

		if (twitchPath && isTwitch(twitchPath)) url = isTwitch(twitchPath)
		if (redditPath && isReddit(redditPath)) url = isReddit(redditPath)
		if (gifPath && isImgur(gifPath)) url = isImgur(gifPath)
		if (gifPath && isGfycat(gifPath)) url = isGfycat(gifPath)
		if (gifPath && isThumbsGfycat(gifPath)) url = isThumbsGfycat(gifPath)
		if (gifPath && isGiphy(gifPath)) url = isGiphy(gifPath)
		if (redditGifPath && isRedditGif(redditGifPath)) url = isRedditGif(redditGifPath)
		if (redditGifDirect) url = redditGifDirect

		if (url !== '') {
			const itemLink = url

			if (itemLink && twitchPath && isTwitch(itemLink)) {
				parsedData.data.push({
					title: item.data.title,
					video_url: itemLink,
					twitch_url: item.data.url,
					comments_url: item.data.permalink
				})
			} else if (itemLink && redditPath && isReddit(itemLink)) {
				const audio_url = `${itemLink.substr(0, itemLink.lastIndexOf('_') + 1)}audio.mp4`

				parsedData.data.push({
					title: item.data.title,
					video_url: itemLink,
					audio_url,
					comments_url: item.data.permalink
				})
			} else if (itemLink) {
				parsedData.data.push({
					title: item.data.title,
					video_url: itemLink,
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

export const isTwitch = (url: string) => {
	const twitchAddress = 'https://clips-media-assets2.twitch.tv' || 'http://clips-media-assets2.twitch.tv'

	if (url && url.includes(twitchAddress)) return url.replace('-social', '').replace('-preview.jpg', '.mp4')
	else return false
}
export const isReddit = (url: string) => {
	const redditAddress = 'https://v.redd.it' || 'http://v.redd.it'

	if (url && url.includes(redditAddress)) return url.replace('?source=fallback', '')
	else return false
}
export const isRedditGif = (url: string) => {
	const redditgifAddress = 'https://preview.redd.it' || 'https://preview.redd.it'

	if (url && url.includes(redditgifAddress)) return url.replace('amp;', '')
	else return false
}

export const isImgur = (url: string) => {
	const imgurAddress = 'https://i.imgur.com' || 'http://i.imgur.com'

	if (url && url.includes(imgurAddress)) return url.replace('.gifv', '.mp4')
	else return false
}

export const isGfycat = (url: string) => {
	const gfycatAddress = 'https://gfycat.com' || 'http://gfycat.com'

	if (url && url.includes(gfycatAddress)) {
		const urlReplaced = url.replace('http://', '').replace('https://', '')
		return `https://thumbs.${urlReplaced}.mp4`
	} else return false
}

export const isGiphy = (url: string) => {
	const giphyAddress = 'https://media.giphy.com/' || 'http://media.giphy.com'

	if (url && url.includes(giphyAddress)) return url.replace('.gif', '.mp4')
	else return false
}

export const isThumbsGfycat = (url: string) => {
	const thumbsgfycatAddress = 'https://thumbs.gfycat.com' || 'http://thumbs.gfycat.com'

	if (url && url.includes(thumbsgfycatAddress)) return url.replace('.gif', '.mp4')
	else return false
}
