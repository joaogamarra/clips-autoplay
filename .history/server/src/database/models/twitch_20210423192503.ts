import Mongoose from 'mongoose'

const twitchChannelSchema = new Mongoose.Schema({
	login: String,
})

export const TwitchChannel = Mongoose.model('twitchChannel', twitchChannelSchema)
