import React, { FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavourites, removeFavourite } from 'src/common/localstorage'
import { apiTimePeriod, searchClips } from 'src/types/search'

const Favourites: FC = () => {
	const [favourites, setFavourites] = useState<{ search: searchClips; rank: number }[]>([])

	const loadFavourites = useCallback(() => {
		const favouritesRes = getFavourites()

		setFavourites(favouritesRes)
	}, [])

	useEffect(() => {
		loadFavourites()
	}, [loadFavourites])

	const handleRemove = (search: searchClips) => {
		removeFavourite(search)
		loadFavourites()
	}

	return (
		<>
			{favourites && (
				<>
					<h6>Your favourites</h6>
					<ul>
						{favourites.map(({ search }) => (
							<li key={search.value}>
								<Link to={`/${search.mode}/${apiTimePeriod.week}/${search.value}`}>{search.value}</Link>
								<button onClick={() => handleRemove(search)}>X</button>
							</li>
						))}
					</ul>
				</>
			)}
		</>
	)
}

export default Favourites
