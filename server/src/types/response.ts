export interface responseClips {
	data: responseClip[]
	pagination: {
		cursor: string
	}
}

export interface responseClip {
	id: string
	title: string
	video_url: string
	audio_url?: string
	comments_url?: string
	twitch_url?: string
	comments?: comment[]
	nsfw?: boolean
	loud?: boolean
	isYoutube?: boolean
}

export interface comment {
	author: string
	score: string
	comment: string
}
