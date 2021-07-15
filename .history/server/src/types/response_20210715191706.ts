export interface responseClips {
	data: responseClip[]
	pagination: {
		cursor: string
	}
}

export interface responseClip {
	title: string
	video_url: string
	comments_url?: string
	embed_url?: string
}
