const getUserClips = (id: string): Patient | undefined => {
	return patients.find((p) => p.id === id)
}

export default {
	getUserClips,
}
