import Mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const twitchSearchSchema = new Mongoose.Schema({
	id: Number,
	login: {
		type: String,
		unique: true,
	},
})

twitchSearchSchema.plugin(uniqueValidator)

export const TwitchSearch = Mongoose.model('twitchSearch', twitchSearchSchema)
