import { XIcon } from "@primer/octicons-react"
import { FC } from "react"
import { Link } from "react-router-dom"

const PlayerError: FC = () => {
	return (
		<div className='error-container'>
			<XIcon size={48} />
			<p className='error-description'>
				We couldn't find any clips for your Search.
				<br />
				The game/user might not exist or they might not have any clips in the selected period.
				<br /> Users that are currently suspended also have their clips disabled.
			</p>
			<Link to='/' className='button-generic'>
				New Search
			</Link>
		</div>
	)
}

export default PlayerError
