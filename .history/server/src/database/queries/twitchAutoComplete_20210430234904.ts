import { TwitchChannel } from '@/types/twitch'
import { twitchCategoryAutoCompelete, twitchChannelAutoCompelete } from '../models/twitch'

const channelsAuto = async (query: string) => {
	const res = await twitchChannelAutoCompelete
		.find({ login: new RegExp('^' + query) })
		.sort({ rank: -1 })
		.limit(10)
	return res
}

const categoriesAuto = async (query: string) => {
	console.log(query)
	const res = await twitchCategoryAutoCompelete
		.find({ name: new RegExp('^' + query) })
		.sort({ rank: -1 })
		.limit(10)

	return res
}

const channelIncreaseRanking = async (channel: TwitchChannel) => {
	//check if channel is already in DB
	const channelFind = await twitchChannelAutoCompelete.find({ login: channel.login })

	//if not add new channel to DB, else just increase existing channel's rank
	if (channelFind.length === 0) {
		const newChannel = new twitchChannelAutoCompelete({
			id: channel.id,
			login: channel.login,
			rank: 1,
		})
		newChannel.save()
	} else {
		await twitchChannelAutoCompelete.updateOne({ login: channel.login }, { $inc: { rank: 1 } })
	}
}

const categoryIncreaseRanking = async (id: string) => {
	const idParsed = id.toLowerCase()
	await twitchCategoryAutoCompelete.updateOne({ name: idParsed }, { $inc: { rank: 1 } })
}

const channelsDefault = async () => {
	return await twitchChannelAutoCompelete.find({}).sort({ rank: -1 }).limit(10)
}

const categoriesDefault = async () => {
	return await twitchCategoryAutoCompelete.find({}).sort({ rank: -1 }).limit(10)
}

export {
	channelsAuto,
	categoriesAuto,
	channelIncreaseRanking,
	categoryIncreaseRanking,
	channelsDefault,
	categoriesDefault,
}
