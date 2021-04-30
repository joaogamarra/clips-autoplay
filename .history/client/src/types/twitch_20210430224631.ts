export interface TwitchClip {
	id?: string
	url?: string
	embed_url: string
	broadcaster_id?: string
	broadcaster_name?: string
	creator_id?: string
	creator_name?: string
	video_id?: string
	game_id?: string
	language?: string
	title?: string
	view_count?: number
	created_at?: string
	thumbnail_url?: string
	duration?: number
}

export interface TwitchClipsResponse {
	data: TwitchClip[]
	pagination: {
		cursor: string
	}
}

export interface AutocompleteObj {
	_id: string
	id: number
	login?: string
	name?: string
	rank: number
	__v: number
}
