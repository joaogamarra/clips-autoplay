import Mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const twitchSearchSchema = new Mongoose.Schema({
	id: Number,
	login: {
		type: String,
		unique: true,
	},
	rank: Number,
})

const twitchSearchCategorySchema = new Mongoose.Schema({
	id: {
		type: String,
		unique: true,
	},
	name: String,
	rank: Number,
})

twitchSearchSchema.plugin(uniqueValidator)
twitchSearchCategorySchema.plugin(uniqueValidator)

export const TwitchSearch = Mongoose.model('twitchSearch', twitchSearchSchema)
export const TwitchSearchCategory = Mongoose.model('twitchCategory', twitchSearchCategorySchema)
