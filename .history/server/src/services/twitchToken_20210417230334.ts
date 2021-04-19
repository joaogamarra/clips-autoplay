import axios from 'axios'

const baseUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET}&grant_type=client_credentials`

const getToken = async () => {
	try {
		const res = await axios.post(baseUrl)

		console.log(res)
	} catch (e) {
		console.log(e)
		return false
	}
}

export default getToken
