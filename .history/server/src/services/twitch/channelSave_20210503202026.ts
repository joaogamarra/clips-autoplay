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
	const channels: any = await TwitchChannelAutoComplete.find({}).limit(1000)

	console.log(channels)

	channels.forEach(async (channel: any) => {
		const res = await getChannel(token, channel.name)

		await TwitchChannelAutoComplete.updateOne({ name: channel.name }, { avatar: res.profile_image_url })
	})

	return channels
}
