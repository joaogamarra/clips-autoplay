import { currentSearch } from 'src/types/search'

export const getFavourites = () => {
	return JSON.parse(localStorage.getItem('favourites') || '[]')
}

export const addFavourite = (search: currentSearch) => {
	const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
	const itemIndex = storedFavourites.findIndex(
		(i: { search: currentSearch; rank: number }) => i.search.searchValue === search.searchValue
	)
	let newFavourites

	if (itemIndex >= 0) {
		newFavourites = storedFavourites

		newFavourites[itemIndex].rank = newFavourites[itemIndex].rank + 1
	} else {
		newFavourites = storedFavourites.concat({ search: search, rank: 0 })
	}
	localStorage.setItem('favourites', JSON.stringify(newFavourites))
}
