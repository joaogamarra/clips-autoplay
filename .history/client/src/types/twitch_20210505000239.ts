export interface ResponseClip {
	title: string
	video_url: string
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
