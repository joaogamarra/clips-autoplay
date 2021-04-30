import getResponse from './service'

const getSubreddit = async (subreddit: string) => {
	const baseUrl = `https://old.reddit.com/r/${subreddit}/top.json?limit=30`

	const res = await getResponse(baseUrl)

	if (res) {
		return res.data
	} else {
		return false
	}
}

export default getSubreddit
