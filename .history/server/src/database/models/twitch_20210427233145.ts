import Mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const twitchChannelAutoCompeleteSchema = new Mongoose.Schema({
	id: Number,
	login: {
		type: String,
		unique: true,
	},
	rank: Number,
})

const twitchCategoryAutoCompeleteSchema = new Mongoose.Schema({
	id: {
		type: String,
		unique: true,
	},
	name: String,
	rank: Number,
})

twitchChannelAutoCompeleteSchema.plugin(uniqueValidator)
twitchCategoryAutoCompeleteSchema.plugin(uniqueValidator)

export const twitchChannelAutoCompelete = Mongoose.model(
	'twitchChannelAutoCompelete',
	twitchChannelAutoCompeleteSchema
)
export const twitchCategoryAutoCompelete = Mongoose.model(
	'twitchCategoryAutoCompelete',
	twitchCategoryAutoCompeleteSchema
)
