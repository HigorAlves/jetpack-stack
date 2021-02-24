import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class NewPasswordDTO {
	@ApiProperty()
	@IsNotEmpty({ message: 'This field cannot be empty' })
	@IsString({ message: 'This field must be a string' })
	email: string

	@ApiProperty()
	@IsNotEmpty({ message: 'This field cannot be empty' })
	@IsString({ message: 'This field must be a string' })
	password: string

	@ApiProperty()
	@IsNotEmpty({ message: 'This field cannot be empty' })
	@IsString({ message: 'This field must be a string' })
	code: string
}
