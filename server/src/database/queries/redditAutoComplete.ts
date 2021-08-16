import { getSubreddit } from '../../services/reddit/subreddit'
import { subredditAutoComplete } from '../models/reddit'

const suggestionsLimit = 8

const subredditsDefault = async () => {
	const res = await subredditAutoComplete.find({}).sort({ rank: -1 }).limit(30)
	const shuffle = res.sort(() => Math.random() - 0.5).slice(0, suggestionsLimit)

	return shuffle
}

const subredditsAutoComplete = async (query: string) => {
	const res = await subredditAutoComplete
		.find({ name: new RegExp('^' + query.toLowerCase()) })
		.sort({ rank: -1 })
		.limit(suggestionsLimit)
	return res
}

const subredditIncreaseRanking = async (subreddit: string) => {
	//check if channel is already in DB
	const channelFind = await subredditAutoComplete.find({ name: new RegExp('^' + subreddit.toLowerCase()) })

	//if not add new channel to DB, else just increase existing channel's rank
	if (channelFind.length === 0) {
		const { data } = await getSubreddit(`${subreddit}/about.json`)

		if (data) {
			const avatar = data.icon_img !== null ? data.icon_img : data.header_img
			console.log(avatar, data.icon_img, data.header_img)
			const name = data.display_name.toLowerCase()

			const newSubreddit = new subredditAutoComplete({
				id: data.id,
				name,
				rank: 1,
				avatar
			})
			console.log(newSubreddit)
			await newSubreddit.save()
		}
	} else {
		await subredditAutoComplete.updateOne({ name: subreddit }, { $inc: { rank: 1 } })
	}
}

export { subredditsDefault, subredditIncreaseRanking, subredditsAutoComplete }
