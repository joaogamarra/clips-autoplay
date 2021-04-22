import { Request } from 'express'
import { apiTimePeriod } from '../types/twitch'

export const parseTwitchQuery = (req: Request) => {
	let query
	let timePeriod: apiTimePeriod = apiTimePeriod.all
	let after = ''
	let timeQuery = ''

	if (typeof req.query.timeperiod === 'string') {
		timePeriod = parseTimePeriod(req.query.timeperiod)
		if (timePeriod != apiTimePeriod.all) {
			timeQuery = convertTimePeriod(timePeriod)
		}
	}
	if (typeof req.query.after === 'string') after = `&after=${req.query.after}`

	query = `${timeQuery}${after}`

	return query
}

export const parseTimePeriod = (timePeriod: string) => {
	if (timePeriod === 'day') return apiTimePeriod.day
	if (timePeriod === 'week') return apiTimePeriod.week
	if (timePeriod === 'month') return apiTimePeriod.month
	if (timePeriod === 'all') return apiTimePeriod.all

	throw new Error('Bad Request: Time Period')
}

export const convertTimePeriod = (timePeriod: apiTimePeriod) => {
	const currentDate = new Date()
	let endDate = ''

	if (timePeriod === apiTimePeriod.day) {
		const day = new Date(currentDate)
		day.setDate(day.getDate() - 1)
		endDate = day.toISOString()
	}

	if (timePeriod === apiTimePeriod.week) {
		const week = new Date(currentDate)
		week.setDate(week.getDate() - 7)
		endDate = week.toISOString()
	}

	if (timePeriod === apiTimePeriod.month) {
		const month = new Date(currentDate)
		month.setDate(month.getDate() - 7)
		endDate = month.toISOString()
	}

	const currentDateFormatted = currentDate.toISOString()

	return `&started_at=${currentDateFormatted}&ended_at=${endDate}`
}
