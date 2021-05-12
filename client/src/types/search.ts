export enum searchType {
	channel = 'channel',
	category = 'category',
	subreddit = 'subreddit',
}

export interface searchClips {
	mode: searchType
	value: string
	timePeriod: apiTimePeriod
	sort: sortType
}

export enum apiTimePeriod {
	day = 'day',
	week = 'week',
	month = 'month',
	year = 'year',
	all = 'all',
}

export enum sortType {
	new = 'new',
	top = 'top',
	hot = 'hot',
}
