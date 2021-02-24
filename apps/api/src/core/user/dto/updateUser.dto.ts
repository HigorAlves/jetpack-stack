import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

import { ErrorMessages } from '~/constants/dtoMessages'

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: ErrorMessages.isEmpty })
  @IsString({ message: ErrorMessages.isString })
  email: string

  @ApiProperty()
  @IsNotEmpty({ message: ErrorMessages.isEmpty })
  @IsString({ message: ErrorMessages.isString })
  firstName: string

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
}
