import getResponse from './service'

const getSubreddit = async (subreddit: string) => {
	const baseUrl = `https://old.reddit.com/r/${subreddit}`

	const res = await getResponse(baseUrl)

	if (res) {
		return res.data.data[0]
	} else {
		return false
	}
}

export default getSubreddit
