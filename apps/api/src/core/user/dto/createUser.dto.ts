import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

import { ErrorMessages } from '~/constants/dtoMessages'
import { IUser } from '~/interfaces/user'

export class CreateUserDto implements IUser {
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
  @IsString({ message: ErrorMessages.isString })
  firstName: string

  @ApiProperty()
  @IsNotEmpty({ message: ErrorMessages.isEmpty })
  @IsString({ message: ErrorMessages.isString })
  lastName: string

  @ApiProperty()
  @IsNotEmpty({ message: ErrorMessages.isEmpty })
  @IsString({ message: ErrorMessages.isString })
  image: string

  @ApiProperty()
  @IsNotEmpty({ message: ErrorMessages.isEmpty })
  locale: { currency: 'BRL' | 'USD'; language: 'Portuguese' | 'English' }

  @ApiProperty()
  @IsNotEmpty({ message: ErrorMessages.isEmpty })
  @IsString({ message: ErrorMessages.isString })
  role: 'client' | 'admin'
}
