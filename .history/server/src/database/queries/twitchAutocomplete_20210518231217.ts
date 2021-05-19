import { TwitchChannel } from '../../types/twitch'
import { TwitchCategoryAutoComplete, TwitchChannelAutoComplete } from '../models/twitch'

const channelsLimit = 8

const channelsAutoComplete = async (query: string) => {
	const res = await TwitchChannelAutoComplete.find({ name: new RegExp('^' + query) })
		.sort({ rank: -1 })
		.limit(channelsLimit)
	return res
}

const categoriesAutoComplete = async (query: string) => {
	const res = await TwitchCategoryAutoComplete.find({ name: new RegExp('^' + query) })
		.sort({ rank: -1 })
		.limit(channelsLimit)

	return res
}

const channelIncreaseRanking = async (channel: TwitchChannel) => {
	//check if channel is already in DB
	const channelFind = await TwitchChannelAutoComplete.find({ name: channel.login })

	//if not add new channel to DB, else just increase existing channel's rank
	if (channelFind.length === 0) {
		const newChannel = new TwitchChannelAutoComplete({
			id: channel.id,
			name: channel.login,
			rank: 1,
		})
		newChannel.save()
	} else {
		await TwitchChannelAutoComplete.updateOne({ name: channel.login }, { $inc: { rank: 1 } })
	}
}

const categoryIncreaseRanking = async (id: string) => {
	const idParsed = id.toLowerCase()
	await TwitchCategoryAutoComplete.updateOne({ name: idParsed }, { $inc: { rank: 1 } })
}

const channelsDefault = async () => {
	return await TwitchChannelAutoComplete.find({}).sort({ rank: -1 }).limit(channelsLimit)
}

const categoriesDefault = async () => {
	return await TwitchCategoryAutoComplete.find({}).sort({ rank: -1 }).limit(channelsLimit)
}

export {
	channelsAutoComplete,
	categoriesAutoComplete,
	channelIncreaseRanking,
	categoryIncreaseRanking,
	channelsDefault,
	categoriesDefault,
}
