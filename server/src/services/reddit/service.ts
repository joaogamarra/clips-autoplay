import axios from 'axios';

const getResponse = async (baseUrl: string, timeout?: number) => {
	let configTimeout = 4000;
	if (timeout) configTimeout = timeout;

	try {
		const res = await axios.get(baseUrl, {
			timeout: configTimeout
		});

		return res;
	} catch (e) {
		console.log(e);
		return false;
	}
};

export default getResponse;
