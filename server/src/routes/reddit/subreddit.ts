import { getSubreddit } from '../../services/reddit/subreddit';
import express from 'express';
import { parseSubreddit } from '../../common/subredditParsing';
import axios, { AxiosResponse } from 'axios';
import { parseRedditQuery } from '../../common/queryParsing';
import { subredditIncreaseRanking } from '../../database/queries/redditAutoComplete';
//import getResponse from '../../services/reddit/service';

const router = express.Router();

router.get('/:id', async (req, res) => {
	const tries = 3;
	let currentTry = 1;
	let limit = 2500;
	let dataParsed;

	const redditAuth = async () => {
		const response = await axios.post(
			'https://www.reddit.com/api/v1/access_token',
			new URLSearchParams({
				grant_type: 'client_credentials'
			}),
			{
				auth: {
					username: 'E1oR27T20zfgywF6xhPeHw',
					password: 'ytWQPwrnTEX5w0LnBWl9TDTaH6uP0A'
				},
				headers: {
					'User-Agent': 'clipsautoplay/0.0.1',
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		);

		return response.data.access_token;
	};

	const requestLoop = async (token: string) => {
		const query = parseRedditQuery(req, limit);

		let data: AxiosResponse = await getSubreddit(query, token);

		if (data) {
			dataParsed = await parseSubreddit(data.data);
			if (dataParsed.data.length === 0 && dataParsed.pagination.cursor && currentTry < tries) {
				currentTry++;
				limit = 100;
				req.query.after = dataParsed.pagination.cursor;
				await requestLoop(token);
			}
		} else {
			throw new Error('not found');
		}
	};

	(async () => {
		try {
			const token = await redditAuth();
			await requestLoop(token);

			res.send(dataParsed);
		} catch (error) {
			console.error('Error fetching posts:', error);

			res.send('Fetching Error');
		}
	})();
});

export default router;
