export interface ResponseClip {
	title: string
	video_url: string
	comment_url: string
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
	login?: string
	name?: string
	rank: number
	__v: number
}
