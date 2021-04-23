import Mongoose from 'mongoose'

const twitchSearchSchema = new Mongoose.Schema({
	id: Number,
	login: String,
})

export const TwitchSearch = Mongoose.model('twitchSearch', twitchSearchSchema)
