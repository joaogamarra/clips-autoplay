import { TwitchChannelAutoComplete } from '../../database/models/twitch'
import { TwitchStream, TwitchToken } from '../../types/twitch'
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
	const dbChannels = await TwitchChannelAutoComplete.find({}).sort({ id: 1 }).limit(50)
	const baseUrl = 'https://api.twitch.tv/helix/users?'
	let query = ''
	query = 'test'
	query.concat('oterasf')
	for (let i = 0; i * 10 < dbChannels.length; i++) {
		const slicedChannels = dbChannels.slice(i * 10, i * 10 + 10)

		slicedChannels.forEach((item: any) => {
			query + `&login=${item.name}`
		})
	}

	return `${baseUrl}${query}`
}