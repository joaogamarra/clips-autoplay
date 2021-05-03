export interface redditClips {
	data: redditClip[]
	pagination: {
		cursor: string
	}
}

export interface redditClip {
	embed_url: string
}
