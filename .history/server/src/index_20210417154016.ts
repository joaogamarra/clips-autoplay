import express from 'express'

const main = async () => {
	const app = express()

	app.get('/', (_, res) => {
		res.send('hello')
	})
	app.listen(4000, () => {
		console.log('server started on http://localhost:4000')
	})
}
