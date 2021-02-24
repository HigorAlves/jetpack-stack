declare interface IResponse<T = void> {
	status: number
	error: boolean
	message: string
	token?: string
	data?: T
}
