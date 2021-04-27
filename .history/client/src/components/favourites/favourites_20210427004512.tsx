import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavourites } from 'src/common/localstorage'
import { apiTimePeriod, currentSearch } from 'src/types/search'

const Favourites: FC = () => {
	const [favourites, setFavourites] = useState<{ search: currentSearch; rank: number }[]>([])

	useEffect(() => {
		const favouritesRes = getFavourites()

		setFavourites(favouritesRes)
	}, [])

	return (
		<>
			<h6>Your favourites</h6>
			<ul>
				{favourites.map(({ search }) => (
					<li key={search.searchValue}>
						<Link to={`/${search.searchMode}/${search.searchValue}/${apiTimePeriod.week}`}>
							{search.searchValue}
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

export default Favourites
