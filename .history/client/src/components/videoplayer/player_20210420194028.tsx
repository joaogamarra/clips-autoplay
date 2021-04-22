import { useCallback, useEffect, useState } from 'react'
import { useStateValue } from 'src/state/state'
import { TwitchClip } from 'src/types/twitch'

const Player: React.FC = () => {
	const [{ clips }] = useStateValue()
	const [currentClip, setCurrentClip] = useState<TwitchClip>()
	const urlParams = '&parent=localhost&autoplay=true'

	const fntest = useCallback(() => {
		setCurrentClip(clips.data[0])
	}, [clips])

	useEffect(() => {
		console.log('file: player.tsx ~ line 6 ~ clips', clips)

		fntest()
	}, [clips, fntest])

	return (
		<>
			{currentClip && (
				<iframe
					className='video-iframe'
					title='Twitch Embed'
					frameBorder='0'
					allowFullScreen={true}
					src={`${currentClip?.embed_url}${urlParams}`}
					height='378'
					width='620'
				></iframe>
			)}
		</>
	)
}

export default Player
