import { TwitchToken } from '../../types/twitch'
import { TwitchChannel } from '../../database/models/twitch'
import getResponse from './service'

const getChannel = async (token: TwitchToken, channel: string) => {
	const baseUrl = `https://api.twitch.tv/helix/users?login=${channel}`

	const res = await getResponse(token, baseUrl)

	if (res) {
		const data = res.data.data[0]
		const channel = new TwitchChannel({
			id: data.id,
			login: data.login,
			display_name: data.display_name,
			type: data.type,
			broadcaster_type: data.broadcaster_type,
			description: data.description,
			profile_image_url: data.profile_image_url,
			offline_image_url: data.offline_image_url,
			view_count: data.view_count,
			created_at: data.created_at,
		})

		await channel.save()

		return res.data.data[0]
	} else {
		return false
	}
}

export default getChannel
