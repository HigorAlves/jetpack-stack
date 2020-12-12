import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

/*
  Please, use DTO only for incoming payload from controller, and make sure it have been correctly validated
  For other interfaces use ./src/interfaces/yourapp.interface.ts
*/

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string
}
