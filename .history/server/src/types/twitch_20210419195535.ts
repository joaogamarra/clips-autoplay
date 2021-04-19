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
