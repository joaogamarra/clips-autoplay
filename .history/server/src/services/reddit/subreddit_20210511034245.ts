import getResponse from './service'

const getSubreddit = async (query: string) => {
	const baseUrl = `https://old.reddit.com/r/livestreamfail/top.json?limit=29${query}`

	const res = await getResponse(baseUrl)

	if (res) {
		return res.data.data
	} else {
		return false
	}
}

export default getSubreddit
