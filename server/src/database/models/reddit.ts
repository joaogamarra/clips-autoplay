import Mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const subredditAutoCompleteSchema = new Mongoose.Schema({
	id: String,
	name: {
		type: String,
		unique: true
	},
	rank: Number,
	avatar: String
})

subredditAutoCompleteSchema.plugin(uniqueValidator)

export const subredditAutoComplete = Mongoose.model('subredditAutoComplete', subredditAutoCompleteSchema)
