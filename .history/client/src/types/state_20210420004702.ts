export type State = {
	clips: { [id: string]: Patient }
	patient: Patient | null
	diagnosis: Diagnosis[]
}
