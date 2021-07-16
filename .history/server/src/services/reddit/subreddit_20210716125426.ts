import getResponse from './service'

export const getSubreddit = async (query: string) => {
	const baseUrl = `https://old.reddit.com/r/${query}`
	console.log(baseUrl)
	const res = await getResponse(baseUrl)

	if (res) {
		return res.data
	} else {
		return false
	}
}
