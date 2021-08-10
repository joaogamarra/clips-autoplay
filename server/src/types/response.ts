export interface responseClips {
	data: responseClip[]
	pagination: {
		cursor: string
	}
}

export interface responseClip {
	title: string
	video_url: string
	audio_url?: string
	comments_url?: string
	twitch_url?: string
	comments?: comment[]
}

export interface comment {
	author: string
	score: string
	comment: string
}
