import axios from 'axios';

export const getSubreddit = async (query: string, token?: string) => {
	const baseUrl = `https://oauth.reddit.com/r/${query}`;
	const res = await axios.get(baseUrl, {
		headers: {
			Authorization: `Bearer ${token}`,
			'User-Agent': 'clipsautoplay/0.0.1'
		}
	});
	if (res) {
		return res.data;
	} else {
		return false;
	}
};
