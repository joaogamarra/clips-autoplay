import { TwitchChannel } from '../../types/twitch'
import { TwitchCategoryAutoComplete, TwitchChannelAutoComplete } from '../models/twitch'

const channelsAutoComplete = async (query: string) => {
	const res = await TwitchChannelAutoComplete.find({ name: new RegExp('^' + query) })
		.sort({ rank: -1 })
		.limit(10)
	return res
}

const categoriesAutoComplete = async (query: string) => {
	console.log(query)
	const res = await TwitchCategoryAutoComplete.find({ name: new RegExp('^' + query) })
		.sort({ rank: -1 })
		.limit(10)

	return res
}

const channelIncreaseRanking = async (channel: TwitchChannel) => {
	//check if channel is already in DB
	const channelFind = await TwitchChannelAutoComplete.find({ name: channel.name })

	//if not add new channel to DB, else just increase existing channel's rank
	if (channelFind.length === 0) {
		const newChannel = new TwitchChannelAutoComplete({
			id: channel.id,
			name: channel.name,
			rank: 1,
		})
		newChannel.save()
	} else {
		await TwitchChannelAutoComplete.updateOne({ name: channel.name }, { $inc: { rank: 1 } })
	}
}

const categoryIncreaseRanking = async (id: string) => {
	const idParsed = id.toLowerCase()
	await TwitchCategoryAutoComplete.updateOne({ name: idParsed }, { $inc: { rank: 1 } })
}

const channelsDefault = async () => {
	return await TwitchChannelAutoComplete.find({}).sort({ rank: -1 }).limit(10)
}

const categoriesDefault = async () => {
	return await TwitchCategoryAutoComplete.find({}).sort({ rank: -1 }).limit(10)
}

export {
	channelsAutoComplete,
	categoriesAutoComplete,
	channelIncreaseRanking,
	categoryIncreaseRanking,
	channelsDefault,
	categoriesDefault,
}
