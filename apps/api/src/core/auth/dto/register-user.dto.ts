import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

import { ErrorMessages } from '~/constants/dtoMessages'
import { IUser } from '~/interfaces/user'

export class RegisterUserDTO implements IUser {
	@ApiProperty()
	@IsNotEmpty({ message: ErrorMessages.isEmpty })
	@IsString({ message: ErrorMessages.isString })
	email: string

	@ApiProperty()
	@IsNotEmpty({ message: ErrorMessages.isEmpty })
	@IsString({ message: ErrorMessages.isString })
	password: string

	@ApiProperty()
	@IsNotEmpty({ message: ErrorMessages.isEmpty })
	birthday: { day: number; month: number; year: number }

	@ApiProperty()
	@IsNotEmpty({ message: ErrorMessages.isEmpty })
	@IsString({ message: ErrorMessages.isString })
	firstName: string

	@ApiProperty()
	@IsNotEmpty({ message: ErrorMessages.isEmpty })
	@IsBoolean({ message: ErrorMessages.isBoolean })
	gender: boolean

	@ApiProperty()
	@IsNotEmpty({ message: ErrorMessages.isEmpty })
	@IsString({ message: ErrorMessages.isString })
	image: string

	@ApiProperty()
	@IsNotEmpty({ message: ErrorMessages.isEmpty })
	@IsString({ message: ErrorMessages.isString })
	lastName: string

	@ApiProperty()
	@IsNotEmpty({ message: ErrorMessages.isEmpty })
	locale: { currency: 'BRL' | 'USD'; language: 'Portuguese' | 'English' }

	@ApiProperty()
	@IsNotEmpty({ message: ErrorMessages.isEmpty })
	@IsString({ message: ErrorMessages.isString })
	role: 'client' | 'admin'
}
