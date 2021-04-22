export enum searchType {
	channel = 'channel',
	category = 'category',
}

export interface currentSearch {
	mode: searchType
	value: string
}

export enum apiTimePeriod {
	day = 'day',
	week = 'week',
	month = 'month',
	all = 'all',
}
