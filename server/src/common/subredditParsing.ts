import { getSubreddit } from '../services/reddit/subreddit'
import { responseClip, responseClips } from '../types/response'

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
		const twitchDirectPath = item.data?.url_overridden_by_dest
		let redditPath = item.data?.media?.reddit_video?.fallback_url
		if (!redditPath && item.data?.crosspost_parent_list)
			redditPath = item.data?.crosspost_parent_list[0]?.media?.reddit_video?.fallback_url
		const redditGifPath = item.data?.preview?.images[0]?.variants?.mp4?.source?.url
		const redditGifDirect = item.data?.preview?.reddit_video_preview?.fallback_url
		let gifPath = item.data?.url_overridden_by_dest
		const youtubePath = item.data?.url_overridden_by_dest

		if (!gifPath?.endsWith('.gif')) gifPath = false

		if (twitchPath && isTwitch(twitchPath)) url = isTwitch(twitchPath)
		if (!twitchPath && twitchDirectPath && isTwitchDirect(twitchDirectPath))
			url = isTwitchDirect(twitchDirectPath)
		if (redditPath && isReddit(redditPath)) url = isReddit(redditPath)
		if (gifPath && isImgur(gifPath)) url = isImgur(gifPath)
		if (gifPath && isGfycat(gifPath)) url = isGfycat(gifPath)
		if (gifPath && isThumbsGfycat(gifPath)) url = isThumbsGfycat(gifPath)
		if (gifPath && isGiphy(gifPath)) url = isGiphy(gifPath)
		if (redditGifPath && isRedditGif(redditGifPath)) url = isRedditGif(redditGifPath)
		if (redditGifDirect) url = redditGifDirect
		if (youtubePath && isYoutube(youtubePath)) url = isYoutube(youtubePath)

		const nsfw = item.data.over_18
		const loud = item.data.link_flair_text?.toLowerCase().includes('loud')

		if (url !== '' && url) {
			const dataObj: responseClip = {
				id: `subr-${item.data.id}`,
				title: item.data.title,
				video_url: url,
				comments_url: item.data.permalink
			}

			if (nsfw) dataObj.nsfw = nsfw
			if (loud) dataObj.loud = loud

			if (twitchPath && isTwitch(url)) {
				dataObj.twitch_url = item.data.url
			} else if (!twitchPath && twitchDirectPath && isTwitchDirect(twitchDirectPath)) {
				dataObj.video_url = ''
			} else if (redditPath && isReddit(url)) {
				const audio_url = `${url.substr(0, url.lastIndexOf('_') + 1)}audio.mp4`
				dataObj.audio_url = audio_url
			} else if (youtubePath && isYoutube(youtubePath)) {
				dataObj.isYoutube = true
			}
			parsedData.data.push(dataObj)
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
					} else if (commentData.distinguished) {
						const parsedLink = commentData.body.substring(
							commentData.body.indexOf('https://production.assets.clips'),
							commentData.body.length
						)

						item.fallback_url = parsedLink.replace('amp;', '').replace(')', '')
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
export const isTwitchDirect = (url: string) => {
	const twitchAddress = 'https://clips.twitch.tv' || 'http://clips.twitch.tv'

	if (url && url.includes(twitchAddress)) return url
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

export const isYoutube = (url: string) => {
	const youtubeAddress =
		'https://www.youtube.com/' ||
		'http://www.youtube.com/' ||
		'https://m.youtube.com/' ||
		'http://m.youtube.com/'
	const youtubeAddress1 = 'https://youtu.be' || 'https://youtu.be'

	if (url && url.includes(youtubeAddress)) {
		let newURL = url.split('/watch?v=')[1]
		if (newURL && newURL.includes('&amp;')) newURL = newURL.split('&amp;')[0]

		return newURL
	} else if (url && url.includes(youtubeAddress1)) {
		return url.split('utu.be/')[1]
	} else return false
}
