export enum searchType {
	channel = 'channel',
	category = 'category',
}

export interface currentSearch {
	mode: searchType
	value: string
}
