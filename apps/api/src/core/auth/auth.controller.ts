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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { Request, Response } from 'express'

import { LoginDTO } from './dto/login.dto'
import { NewPasswordDTO } from './dto/new-password.dto'
import { RegisterUserDTO } from './dto/register-user.dto'
import { UpdatePasswordDTO } from './dto/update-password.dto'
import { JwtAuthGuard } from './guards/jwt.guard'
import { AuthService } from '~/core/auth/auth.service'
import { SentryInterceptor } from '~/interceptors/sentry.interceptor'
import { jwtPayload } from '~/types/jwtPayload'

@ApiTags('Auth')
@UseInterceptors(SentryInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ description: 'User logged in' })
  @ApiResponse({ status: 403, description: 'User or password wrong.' })
  @Post('login')
  async login(
    @Body() data: LoginDTO,
    @Res() response: Response
  ): Promise<Response> {
    const { status, message, token } = await this.authService.login(data)
    return response.status(status).send({ message, token })
  }

  @ApiCreatedResponse()
  @Post('register')
  async register(
    @Body() user: RegisterUserDTO,
    @Res() response: Response
  ): Promise<Response> {
    const result = await this.authService.register(user)
    return response.status(result.status).send(result)
  }

  @Post('recoverpassword')
  async passwordRecovery(
    @Body('email') email: string,
    @Res() response: Response
  ): Promise<Response> {
    const { status, message } = await this.authService.recoveryPassword(email)
    return response.status(status).send(message)
  }

  @Put('newpassword')
  async newPassword(
    @Body() data: NewPasswordDTO,
    @Res() response: Response
  ): Promise<Response> {
    const { status, message, error } = await this.authService.newPassword(data)
    return response.status(status).send({ message, error })
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('updatepassword')
  async passwordUpdate(
    @Body() data: UpdatePasswordDTO,
    @Req() req: Request,
    @Res() response: Response
  ) {
    const user = req.user as jwtPayload
    const dto = { ...user, ...data }
    const { status, message, error } = await this.authService.updatePassword(
      dto
    )
    return response.status(status).send({ message, error })
  }
}
