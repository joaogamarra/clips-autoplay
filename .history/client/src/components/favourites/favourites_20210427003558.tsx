import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavourites } from 'src/common/localstorage'
import { apiTimePeriod } from 'src/types/search'

const Favourites: FC = () => {
	const [favourites, setFavourites] = useState([])

	useEffect(() => {
		const favouritesRes = getFavourites()

		setFavourites(favouritesRes)
	}, [])

	return (
		<>
			<h6>Your favourites</h6>
			<ul>
				{favourites.map((favourite) => (
					<li key={favourite.login}>
						<Link to={`/${favourite.category}/${favourite.name}/${apiTimePeriod.week}`}>
							{favourite.name}
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

export default Favourites
