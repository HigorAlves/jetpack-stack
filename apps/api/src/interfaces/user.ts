export interface IUser {
  email: string
  password?: string
  firstName: string
  image: string
  lastName: string
  locale: { currency: 'BRL' | 'USD'; language: 'Portuguese' | 'English' }
  role?: 'client' | 'admin'
}
