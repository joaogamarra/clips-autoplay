import getResponse from './service'

export const getSubreddit = async (query: string) => {
	const baseUrl = `https://reddit.com/r/${query}`
	const res = await getResponse(baseUrl)

	if (res) {
		return res.data
	} else {
		return false
	}
}
