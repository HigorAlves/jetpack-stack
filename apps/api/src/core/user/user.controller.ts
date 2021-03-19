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
	UseInterceptors
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { CreateUserDto, UpdateUserDto } from './dto'
import { UserService } from '~/core/user/user.service'
import { Roles } from '~/decorators/roles.decorator'
import { JwtAuthGuard, RolesGuard } from '~/guards'
import { SentryInterceptor } from '~/interceptors/sentry.interceptor'
import { Role } from '~/types/role.enum'

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(SentryInterceptor)
@Controller('user')
export class UserController {
	private logger: Logger = new Logger('USER_CONTROLLER')

	constructor(private userService: UserService) {}

	@Roles(Role.CLIENT, Role.ADMIN)
	@Get()
	async findOne(@Body('email') email: string, @Res() res: Response) {
		const response = await this.userService.getByEmail(email)
		return res.status(response.status).send(response)
	}

	@Roles(Role.CLIENT, Role.ADMIN)
	@Get('/all')
	async findAll(@Res() res: Response) {
		const response = await this.userService.findAll()
		return res.status(response.status).send(response)
	}

	@Roles(Role.ADMIN)
	@Post()
	async create(@Body() createUserDTO: CreateUserDto, @Res() res: Response) {
		const response = await this.userService.create(createUserDTO)
		return res.status(response.status).send(response)
	}

	@Roles(Role.ADMIN)
	@Delete()
	async delete(@Body('id') id: string, @Res() response: Response) {
		const result = await this.userService.delete(id)
		return response.status(201).send({ success: result })
	}

	@Roles(Role.CLIENT, Role.ADMIN)
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
