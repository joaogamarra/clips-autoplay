import Mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const twitchChannelAutoCompleteSchema = new Mongoose.Schema({
	id: Number,
	login: {
		type: String,
		unique: true,
	},
	rank: Number,
})

const twitchCategoryAutoCompleteSchema = new Mongoose.Schema({
	id: {
		type: String,
		unique: true,
	},
	name: String,
	rank: Number,
})

twitchChannelAutoCompleteSchema.plugin(uniqueValidator)
twitchCategoryAutoCompleteSchema.plugin(uniqueValidator)

export const TwitchChannelAutoComplete = Mongoose.model(
	'twitchChannelAutoCompelete',
	twitchChannelAutoCompleteSchema
)
export const TwitchCategoryAutoComplete = Mongoose.model(
	'twitchCategoryAutoCompelete',
	twitchCategoryAutoCompleteSchema
)
