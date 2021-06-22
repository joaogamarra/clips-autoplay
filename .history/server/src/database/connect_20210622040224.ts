const mongoose = require('mongoose')

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
	console.log('mongo connected')
})
