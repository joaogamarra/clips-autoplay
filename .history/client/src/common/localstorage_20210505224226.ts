import axios from 'axios'
import { searchClips } from 'src/types/search'
import { AutocompleteObj } from 'src/types/twitch'

export const getFavourites = () => {
	const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')

	const sortedFavourites = storedFavourites.sort((a: { rank: number }, b: { rank: number }) =>
		a.rank < b.rank ? 1 : -1
	)

	return sortedFavourites.slice(0, 10)
}

export const addFavourite = async (search: searchClips) => {
	if (search.value !== '') {
		const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
		const itemIndex = storedFavourites.findIndex(
			(i: { search: searchClips; rank: number }) =>
				i.search.value === search.value && i.search.mode === search.mode
		)
		let newFavourites

		if (itemIndex >= 0) {
			newFavourites = storedFavourites

			newFavourites[itemIndex].rank = newFavourites[itemIndex].rank + 1
		} else {
			const baseUrl = `http://localhost:4000/api/twitch/suggestions/${search.mode}/${search.value}`
			const { data }: { data: AutocompleteObj[] } = await axios.get(baseUrl)
			console.log(data)

			newFavourites = storedFavourites.concat({ search: search, rank: 0, avatar: data[0].avatar })
		}
		localStorage.setItem('favourites', JSON.stringify(newFavourites))
	}
}

export const removeFavourite = (search: searchClips) => {
	const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')

	const newFavourites = storedFavourites.filter((item: { search: searchClips }) => {
		if (item.search.value === search.value && item.search.mode === search.mode) {
			return false
		}

		return true
	})

	localStorage.setItem('favourites', JSON.stringify(newFavourites))
}
