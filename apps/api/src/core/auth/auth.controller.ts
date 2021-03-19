import {
	Controller,
	Post,
	Body,
	UseInterceptors,
	Res,
	Put,
	UseGuards,
	Req
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { Request, Response } from 'express'

import {
	LoginDTO,
	NewPasswordDTO,
	RegisterUserDTO,
	UpdatePasswordDTO
} from './dto'
import { AuthService } from '~/core/auth/auth.service'
import { JwtAuthGuard } from '~/guards'
import { SentryInterceptor } from '~/interceptors/sentry.interceptor'
import { jwtPayload } from '~/types/jwtPayload'

@ApiTags('Auth')
@UseInterceptors(SentryInterceptor)
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOkResponse({ description: 'Successfuly loged in' })
	@ApiResponse({ status: 403, description: 'Email or password wrong' })
	@Post('login')
	async login(@Body() data: LoginDTO, @Res() res: Response): Promise<Response> {
		const response = await this.authService.login(data)
		return res.status(response.status).send(response)
	}

	@ApiResponse({ status: 201, description: 'User has been created' })
	@ApiResponse({ status: 409, description: 'This user cannot be created.' })
	@Post('register')
	async register(
		@Body() user: RegisterUserDTO,
		@Res() res: Response
	): Promise<Response> {
		const response = await this.authService.register(user)
		return res.status(response.status).send(response)
	}

	@ApiResponse({
		status: 201,
		description: 'Recovery code created successfully'
	})
	@ApiResponse({
		status: 409,
		description: 'There is already a code generated for this email.'
	})
	@Post('recoverpassword')
	async passwordRecovery(
		@Body('email') email: string,
		@Res() res: Response
	): Promise<Response> {
		const response = await this.authService.recoveryPassword(email)
		return res.status(response.status).send(response)
	}

	@ApiResponse({
		status: 204,
		description: 'Your password has been changed'
	})
	@ApiResponse({
		status: 406,
		description: 'Your code our email is not right'
	})
	@Put('newpassword')
	async newPassword(
		@Body() data: NewPasswordDTO,
		@Res() res: Response
	): Promise<Response> {
		const response = await this.authService.newPassword(data)
		return res.status(response.status).send(response)
	}

	@ApiResponse({
		status: 204,
		description: 'Your password has been updated'
	})
	@ApiResponse({
		status: 409,
		description: 'We cant update this password'
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Put('updatepassword')
	async passwordUpdate(
		@Body() data: UpdatePasswordDTO,
		@Req() req: Request,
		@Res() res: Response
	) {
		const user = req.user as jwtPayload
		const userData = { ...user, ...data }
		const response = await this.authService.updatePassword(userData)
		return res.status(response.status).send(response)
	}
}
