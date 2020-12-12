export type IUser = {
  id?: string
  firstName: string
  lastName: string
  image: string
  email: string
  password: string
  locale: {
    currency: 'BRL' | 'USD'
    language: 'Portuguese' | 'English'
  }
  role: 'admin' | 'client'
}
