import { IUser } from './user'

export type jwtPayload = Pick<IUser, 'role'> & Pick<IUser, 'email'>
