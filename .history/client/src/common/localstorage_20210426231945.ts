export const getFavourites = () => {
	return JSON.parse(localStorage.getItem('favourites') || '[]')
}

export const addFavourite = (channel: string) => {
	const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
	const itemIndex = storedFavourites.findIndex((i: { login: string }) => i.login === channel)
	let newFavourites

	if (itemIndex >= 0) {
		newFavourites = storedFavourites

		newFavourites[itemIndex].rank = newFavourites[itemIndex].rank + 1
	} else {
		newFavourites = storedFavourites.concat({ login: channel, rank: 0 })
	}
	localStorage.setItem('favourites', JSON.stringify(newFavourites))
}
