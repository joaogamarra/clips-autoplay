import getResponse from './service'

const getSubreddit = async (id: string, query: string) => {
	const baseUrl = `https://old.reddit.com/r/${id}/top.json?limit=30${query}`
	console.log(baseUrl)

	const res = await getResponse(baseUrl)

	if (res) {
		return res.data.data
	} else {
		return false
	}
}

export default getSubreddit
