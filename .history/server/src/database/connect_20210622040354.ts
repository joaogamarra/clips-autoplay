const mongoose = require('mongoose')

console.log(process.env.MONGO_URI)
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error: { message: any }) => {
		console.log('error connection to MongoDB:', error.message)
	})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
	console.log('mongo connected')
})
