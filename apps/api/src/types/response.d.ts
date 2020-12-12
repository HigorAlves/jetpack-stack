export type ResponseType<T = void> = {
  status: number
  error: string | boolean
  message: string
  token?: string
}
