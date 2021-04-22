import { apiTimePeriod } from './twitch'

export const parseTimePeriod = (timePeriod: string) => {
	if (timePeriod === 'day') return apiTimePeriod.day
	if (timePeriod === 'week') return apiTimePeriod.week
	if (timePeriod === 'month') return apiTimePeriod.month
	if (timePeriod === 'all') return apiTimePeriod.all

	throw new Error('Bad Request: Time Period')
}
