export const getFavourites = () => {}

export const addFavourite = (channel: string) => {
	const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')

	console.log(storedFavourites)

	if (storedFavourites.some((i: { login: string }) => i.login === channel)) {
	} else {
		const newFavourites = storedFavourites.concat({ login: channel, rank: 0 })
		localStorage.setItem('favourites', JSON.stringify(newFavourites))
	}
}
