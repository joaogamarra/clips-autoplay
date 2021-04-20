const Player: React.FC = () => {
	return (
		<>
			<iframe
				title='Twitch Embed'
				frameBorder='0'
				allowFullScreen={true}
				src='https://clips.twitch.tv/embed?clip=OddToughLampRlyTho&parent=localhost'
				height='378'
				width='620'
			></iframe>
		</>
	)
}

export default Player
