import { FC } from "react"
import { Link } from "react-router-dom"

const PlayerFinished: FC = () => {
	return (
		<div className='error-container'>
			<p className='error-description'>
				You have reached the final clip for the current search
			</p>
			<Link to='/' className='button-generic'>
				New Search
			</Link>
		</div>
	)
}

export default PlayerFinished
