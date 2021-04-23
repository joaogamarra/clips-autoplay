import Mongoose from 'mongoose'

const twitchChannelSchema = new Mongoose.Schema({
	id: Number,
	login: String,
	display_name: String,
	type: String,
	broadcaster_type: String,
	description: String,
	profile_image_url: String,
	offline_image_url: String,
	view_count: Number,
	created_at: String,
})

export const twitchChannelModel = Mongoose.model('twitchChannel', twitchChannelSchema)
