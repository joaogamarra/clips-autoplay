export interface TwitchToken {
	access_token: string
	refresh_token?: string
	expires_in: number
	scope?: Array<String>
	token_type: string
}

export interface TwitchChannel {
	id: number
	login: string
	display_name: string
	type: string
	broadcaster_type: string
	description: string
	profile_image_url: string
	offline_image_url: string
	view_count: number
	created_at: string
}

export interface TwitchCategory {
	id: number
	name: string
	box_art_url: string
}

export enum apiTimePeriod {
	day = 'day',
	week = 'week',
	month = 'month',
	all = 'all',
}
