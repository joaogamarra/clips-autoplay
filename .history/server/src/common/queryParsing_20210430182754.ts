import { Request } from 'express'
import { twitchTimePeriod } from '../types/twitch'

export const parseTwitchQuery = (req: Request) => {
	let query
	let timePeriod: twitchTimePeriod = twitchTimePeriod.all
	let after = ''
	let timeQuery = ''

	if (typeof req.query.timeperiod === 'string') {
		timePeriod = parseTimePeriod(req.query.timeperiod)
		if (timePeriod != twitchTimePeriod.all) {
			timeQuery = convertTimePeriod(timePeriod)
		}
	}
	if (typeof req.query.after === 'string') after = `&after=${req.query.after}`

	query = `${timeQuery}${after}`

	return query
}

export const parseTimePeriod = (timePeriod: string) => {
	if (timePeriod === 'day') return twitchTimePeriod.day
	if (timePeriod === 'week') return twitchTimePeriod.week
	if (timePeriod === 'month') return twitchTimePeriod.month
	if (timePeriod === 'year') return twitchTimePeriod.year
	if (timePeriod === 'all') return twitchTimePeriod.all

	throw new Error('Bad Request: Time Period')
}

export const convertTimePeriod = (timePeriod: twitchTimePeriod) => {
	const currentDate = new Date()
	let startDate = ''

	if (timePeriod === twitchTimePeriod.day) {
		const day = new Date(currentDate)
		day.setDate(day.getDate() - 1)
		startDate = day.toISOString()
	}

	if (timePeriod === twitchTimePeriod.week) {
		const week = new Date(currentDate)
		week.setDate(week.getDate() - 7)
		startDate = week.toISOString()
	}

	if (timePeriod === twitchTimePeriod.month) {
		const month = new Date(currentDate)
		month.setDate(month.getDate() - 30)
		startDate = month.toISOString()
	}

	if (timePeriod === twitchTimePeriod.year) {
		const year = new Date(currentDate)
		year.setDate(year.getDate() - 365)
		startDate = year.toISOString()
	}

	const currentDateFormatted = currentDate.toISOString()

	return `&started_at=${startDate}&ended_at=${currentDateFormatted}`
}

export const parseRedditQuery = (req: Request) => {
	let query
	let timePeriod: twitchTimePeriod = twitchTimePeriod.all
	let after = ''
	let timeQuery = ''

	if (typeof req.query.timeperiod === 'string') {
		timePeriod = parseTimePeriod(req.query.timeperiod)
		if (timePeriod != twitchTimePeriod.all) {
			timeQuery = convertTimePeriod(timePeriod)
		}
	}
	if (typeof req.query.after === 'string') after = `&after=${req.query.after}`

	query = `${timeQuery}${after}`

	return query
}
