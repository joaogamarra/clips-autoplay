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

const twitchCategorySchema = new Mongoose.Schema({
	id: {
		type: String,
		unique: true,
	},
	name: String,
	rank: Number,
})

twitchSearchSchema.plugin(uniqueValidator)
twitchCategorySchema.plugin(uniqueValidator)

export const TwitchSearch = Mongoose.model('twitchSearch', twitchSearchSchema)
export const TwitchCategory = Mongoose.model('twitchCategory', twitchCategorySchema)
