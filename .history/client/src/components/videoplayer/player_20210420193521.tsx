import { useEffect, useState } from 'react'
import { useStateValue } from 'src/state/state'
import { TwitchClip } from 'src/types/twitch'

const Player: React.FC = () => {
	const [{ clips }] = useStateValue()
	const [currentClip, setCurrentClip] = useState<TwitchClip>()
	const urlParams = '&parent=localhost&autoplay=true'

	const fntest = () => {
		console.log('test')
	}

	useEffect(() => {
		console.log('file: player.tsx ~ line 6 ~ clips', clips)

		const data = clips.data

		setCurrentClip(data[0])

		fntest()
	}, [clips])

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