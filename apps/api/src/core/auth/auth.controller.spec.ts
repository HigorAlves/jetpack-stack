import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'

import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategys/jwt.strategy'
import { LocalStrategy } from './strategys/local.strategy'
import { JWT } from '~/constants'
import { LoggerModule } from '~/interceptors/logger.interceptor'
import { RecoverySchema } from '~/schemas/recovery.schema'
import { rootMongooseTestModule } from '~/utils/mongodb-test'

describe('AuthController', () => {
	let controller: AuthController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				UserModule,
				PassportModule,
				MongooseModule.forFeature([
					{ name: 'Recovery', schema: RecoverySchema }
				]),
				JwtModule.register({
					secret: JWT.secret,
					signOptions: { expiresIn: JWT.duration }
				}),
				LoggerModule
			],
			providers: [AuthService, LocalStrategy, JwtStrategy, AuthRepository],
			controllers: [AuthController]
		}).compile()

		controller = module.get<AuthController>(AuthController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
