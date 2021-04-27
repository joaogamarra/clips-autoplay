export enum searchType {
	channel = 'channel',
	category = 'category',
}

export interface currentSearch {
	searchMode: searchType
	searchValue: string
	searchTimePeriod: apiTimePeriod
}

export enum apiTimePeriod {
	day = 'day',
	week = 'week',
	month = 'month',
	year = 'year',
	all = 'all',
}

export interface favouriteObj {
	login: string
	rank: number
}
