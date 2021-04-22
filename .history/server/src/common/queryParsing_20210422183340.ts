import { Request } from 'express'
import { apiTimePeriod } from '../types/twitch'

export const parseTwitchQuery = (req: Request) => {
	let query
	let timePeriod: apiTimePeriod = apiTimePeriod.all
	let after = ''
	let timeQuery = ''

	console.log()

	if (typeof req.query.timeperiod === 'string') {
		timePeriod = parseTimePeriod(req.query.timeperiod)
	}
	if (typeof req.query.after === 'string') after = `&after=${req.query.after}`

	query = `${timePeriod}${after}`

	return query
}

export const parseTimePeriod = (timePeriod: string) => {
	if (timePeriod === 'day') return apiTimePeriod.day
	if (timePeriod === 'week') return apiTimePeriod.week
	if (timePeriod === 'month') return apiTimePeriod.month
	if (timePeriod === 'all') return apiTimePeriod.all

	throw new Error('Bad Request: Time Period')
}

export const convertTimePeriod = (timePeriod: apiTimePeriod) => {}
