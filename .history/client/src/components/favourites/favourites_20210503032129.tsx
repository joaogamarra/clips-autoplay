import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavourites } from 'src/common/localstorage'
import { apiTimePeriod, searchClips } from 'src/types/search'

const Favourites: FC = () => {
	const [favourites, setFavourites] = useState<{ search: searchClips; rank: number }[]>([])

	useEffect(() => {
		const favouritesRes = getFavourites()

		setFavourites(favouritesRes)
	}, [])

	return (
		<>
			{favourites && (
				<>
					<h6>Your favourites</h6>
					<ul>
						{favourites.map(({ search }) => (
							<li key={search.value}>
								<Link to={`/${search.mode}/${apiTimePeriod.week}/${search.value}`}>{search.value}</Link>
							</li>
						))}
					</ul>
				</>
			)}
		</>
	)
}

export default Favourites
