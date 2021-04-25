import { TwitchSearch, TwitchSearchCategory } from '../models/twitch'

const channelsAuto = async (query: string) => {
	const res = await TwitchSearch.find({ login: new RegExp('^' + query) })
		.sort({ rank: -1 })
		.limit(10)
	return res
}

const categoriesAuto = async (query: string) => {
	console.log(query)
	const res = await TwitchSearchCategory.find({ name: new RegExp('^' + query) })
		.sort({ rank: -1 })
		.limit(10)

	return res
}

const increaseRanking = async () => {}

export { channelsAuto, categoriesAuto }
