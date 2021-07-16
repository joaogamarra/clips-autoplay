import { sortType } from '../types/subreddit'
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
	if (timePeriod === 'year') return apiTimePeriod.year
	if (timePeriod === 'all') return apiTimePeriod.all

	throw new Error('Bad Request: Time Period')
}

export const convertTimePeriod = (timePeriod: apiTimePeriod) => {
	const currentDate = new Date()
	let startDate = ''

	if (timePeriod === apiTimePeriod.day) {
		const day = new Date(currentDate)
		day.setDate(day.getDate() - 1)
		startDate = day.toISOString()
	}

	if (timePeriod === apiTimePeriod.week) {
		const week = new Date(currentDate)
		week.setDate(week.getDate() - 7)
		startDate = week.toISOString()
	}

	if (timePeriod === apiTimePeriod.month) {
		const month = new Date(currentDate)
		month.setDate(month.getDate() - 30)
		startDate = month.toISOString()
	}

	if (timePeriod === apiTimePeriod.year) {
		const year = new Date(currentDate)
		year.setDate(year.getDate() - 365)
		startDate = year.toISOString()
	}

	const currentDateFormatted = currentDate.toISOString()

	return `&started_at=${startDate}&ended_at=${currentDateFormatted}`
}

export const parseSort = (sort: string) => {
	if (sort === 'hot') return sortType.hot
	if (sort === 'top') return sortType.top
	if (sort === 'new') return sortType.new

	throw new Error('Bad Request: Sort')
}

export const parseRedditQuery = (req: Request) => {
	let query
	let timePeriod: apiTimePeriod = apiTimePeriod.all
	let after = ''
	let timeQuery = ''
	let sort = sortType.hot

	if (typeof req.query.timeperiod === 'string') {
		timePeriod = parseTimePeriod(req.query.timeperiod)
		timeQuery = `&t=${timePeriod}`
	}
	if (typeof req.query.sort === 'string') {
		sort = parseSort(req.query.sort)
	}
	if (typeof req.query.after === 'string') after = `&after=${req.query.after}`

	query = `${req.params.id}/${sort}.json?limit=10${timeQuery}${after}`

	return query
}
