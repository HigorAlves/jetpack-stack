import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Res,
  Put,
  UseGuards,
  Request
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { JwtAuthGuard } from '~/core/auth/guards/jwt.guard'
import { CreateUserDto } from '~/core/user/dto/createUser.dto'
import { UpdateUserDto } from '~/core/user/dto/updateUser.dto'
import { UserService } from '~/core/user/user.service'
import { jwtPayload } from '~/types/jwtPayload'

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  private logger: Logger = new Logger('USER_CONTROLLER')

  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Body('email') email: string, @Res() response: Response) {
    const result = await this.userService.getByEmail(email)
    return response.status(200).send(result)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async findAll(@Res() response: Response) {
    const result = await this.userService.findAll()
    return response.status(200).send(result)
  }

  @Post()
  async create(
    @Body() createUserDTO: CreateUserDto,
    @Res() response: Response
  ) {
    this.logger.debug(`${createUserDTO.email} creating a new user`)
    const result = await this.userService.create(createUserDTO)
    return response.status(201).send(result)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(
    @Body('id') id: string,
    @Res() response: Response,
    @Request() req
  ) {
    const payload: jwtPayload = req.user as jwtPayload
    if (payload.role === 'admin') {
      const result = await this.userService.delete(id)
      return response.status(201).send({ success: result })
    } else {
      return response.status(401)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Body() user: UpdateUserDto,
    @Body('id') id: string,
    @Res() response: Response
  ) {
    const result = await this.userService.update(id, user)
    return response.status(201).send(result)
  }
}
