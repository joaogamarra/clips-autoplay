export interface TwitchToken {
	access_token: string
	refresh_token?: string
	expires_in: number
	scope?: Array<String>
	token_type: string
}
