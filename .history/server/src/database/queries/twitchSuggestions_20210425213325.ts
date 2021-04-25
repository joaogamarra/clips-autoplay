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

const channelIncreaseRanking = async (id: string) => {
	await TwitchSearch.updateOne({ login: id }, { $inc: { rank: 1 } })
}

const categoryIncreaseRanking = async (id: string) => {
	const idParsed = id.toLowerCase()
	await TwitchSearchCategory.updateOne({ name: idParsed }, { $inc: { rank: 1 } })
}

const channelsDefault = async () => {
	await TwitchSearch.find({}).sort({ rank: -1 }).limit(10)
}

const categoriesDefault = async () => {
	await TwitchSearchCategory.find({}).sort({ rank: -1 }).limit(10)
}

export {
	channelsAuto,
	categoriesAuto,
	channelIncreaseRanking,
	categoryIncreaseRanking,
	channelsDefault,
	categoriesDefault,
}
