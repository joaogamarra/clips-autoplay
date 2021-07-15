import { searchClips } from './search'

export interface ResponseClip {
	title: string
	video_url: string
	twitch_url: string
	comments_url: string
}

export interface ResponseClips {
	data: ResponseClip[]
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
