import axios from 'axios'

const getResponse = async (baseUrl: string) => {
	try {
		const res = await axios.get(baseUrl, {
			timeout: 1000
		})

		return res
	} catch (e) {
		console.log(e)
		return false
	}
}

export default getResponse
