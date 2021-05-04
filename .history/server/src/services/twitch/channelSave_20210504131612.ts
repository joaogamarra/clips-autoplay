import { TwitchChannelAutoComplete } from '../../database/models/twitch'
import { TwitchStream, TwitchToken } from '../../types/twitch'
import getChannel from './channel'
import getResponse from './service'

export const saveStreams = async (token: TwitchToken, after?: string) => {
	const baseUrl = `https://api.twitch.tv/helix/streams?first=100`

	let query = baseUrl

	if (after) query = `${baseUrl}&after=${after}`

	const res = await getResponse(token, query)

	if (res) {
		const data = res.data.data

		data.forEach((stream: TwitchStream) => {
			const search = new TwitchChannelAutoComplete({
				id: stream.user_id,
				name: stream.user_login,
				rank: 0,
				avatar: '',
			})
			search.save()
		})

		return res.data
	} else {
		return false
	}
}

export const saveAvatar = async (token: TwitchToken) => {
	const dbChannels = await TwitchChannelAutoComplete.find({}).sort({ id: 1 })

	for (let i = 0; i * 100 < dbChannels.length; i++) {
		const slicedChannels = dbChannels.slice(i * 100, i * 100 + 100)
		let query = ''
		let firstLoop = true

		slicedChannels.forEach((item: any) => {
			if (firstLoop) {
				query += `${item.name}`
				firstLoop = false
			} else {
				query += `&login=${item.name}`
			}
		})

		const resChannels = await getChannel(token, query)

		resChannels.data.forEach(async (item: any) => {
			console.log(item.login)
			await TwitchChannelAutoComplete.updateOne({ name: item.login }, { avatar: item.profile_image_url })
		})
	}

	return `done`
}
