import getResponse from './service'

export const getSubreddit = async (query: string, timeout?: number) => {
	const baseUrl = `https://reddit.com/r/${query}`
	const res = await getResponse(encodeURI(baseUrl), timeout)
	if (res) {
		return res.data
	} else {
		return false
	}
}
