import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

/*
  Please, use DTO only for incoming payload from controller, and make sure it have been correctly validated
  For other interfaces use ./src/interfaces/yourapp.interface.ts
*/

export class UpdateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  birthday: { day: number; month: number; year: number }

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  gender: boolean

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string

  @ApiProperty()
  @IsNotEmpty()
  locale: { currency: 'BRL' | 'USD'; language: 'Portuguese' | 'English' }
}
