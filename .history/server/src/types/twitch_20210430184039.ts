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

export interface TwitchStream {
	id: number
	user_id: string
	user_login: string
	user_name: string
	game_id: string
	game_name: string
	type: string
	title: string
	viewer_count: number
	started_at: string
	language: string
	thumbnail_url: string
	tag_ids: string[]
	is_mature: string
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
	year = 'year',
	all = 'all',
}

export enum redditTimePeriod {
	hour = 'hour',
	day = 'day',
	week = 'week',
	month = 'month',
	year = 'year',
	all = 'all',
}
