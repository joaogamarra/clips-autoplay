import { TwitchCategoryAutoComplete } from '../../database/models/twitch'
import { TwitchCategory, TwitchToken } from '../../types/twitch'
import getResponse from './service'

const saveCategories = async (token: TwitchToken, after?: string) => {
	const baseUrl = `https://api.twitch.tv/helix/games/top?first=100`

	let query = baseUrl

	if (after) query = `${baseUrl}&after=${after}`

	const res = await getResponse(token, query)

	if (res) {
		const data = res.data.data

		data.forEach((category: TwitchCategory) => {
			const nameParsed = category.name.toLowerCase()
			const search = new TwitchCategoryAutoComplete({
				id: category.id,
				name: nameParsed,
				rank: 0,
				avatar: category.box_art_url,
			})
			search.save()
		})

		return res.data
	} else {
		return false
	}
}

export const saveCategoriesAvatar = async (token: TwitchToken, after?: string) => {
	const baseUrl = `https://api.twitch.tv/helix/games/top?first=100`

	let query = baseUrl

	if (after) query = `${baseUrl}&after=${after}`

	const res = await getResponse(token, query)

	if (res) {
		const data = res.data.data

		data.forEach((category: TwitchCategory) => {
			console.log(category.id)
			TwitchCategoryAutoComplete.updateOne({ id: category.id }, { avatar: category.box_art_url })
		})

		return res.data
	} else {
		return false
	}
}

export default saveCategories
