import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

import { ErrorMessages } from '~/constants/dtoMessages'

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty({ message: ErrorMessages.isEmpty })
  @IsString({ message: ErrorMessages.isString })
  email: string

  @ApiProperty()
  @IsNotEmpty({ message: ErrorMessages.isEmpty })
  @IsString({ message: ErrorMessages.isString })
  password: string
}
