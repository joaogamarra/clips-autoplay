import { searchClips } from './search'

export interface ResponseClip {
	id: string
	title: string
	video_url: string
	fallback_url?: string
	audio_url?: string
	twitch_url: string
	comments_url: string
	comments?: comment[]
	seen?: boolean
	nsfw?: boolean
	loud?: boolean
	isYoutube?: boolean
}

export interface comment {
	author: string
	score: string
	comment: string
}

export interface ResponseClips {
	data: ResponseClip[]
	filtered: ResponseClip[]
	pagination: {
		cursor: string
	}
}

export interface AutocompleteObj {
	_id: string
	id: number
	name: string
	rank: number
	avatar: string
	__v: number
}

export interface favouritesType {
	search: searchClips
	rank: number
	avatar: string
}
