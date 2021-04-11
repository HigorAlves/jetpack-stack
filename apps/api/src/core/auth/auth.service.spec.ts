import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'
import * as bcrypt from 'bcrypt'

import { AuthService } from './auth.service'
import { JWT } from '~/constants'
import { AuthRepository } from '~/core/auth/auth.repository'
import { JwtStrategy } from '~/core/auth/strategys/jwt.strategy'
import { LocalStrategy } from '~/core/auth/strategys/local.strategy'
import { UserModule } from '~/core/user/user.module'
import { LoggerModule } from '~/interceptors/logger.interceptor'
import { ILogin } from '~/interfaces/authentication'
import { IUser } from '~/interfaces/user'
import { RecoverySchema } from '~/schemas/recovery.schema'
import {
	closeInMongodbConnection,
	rootMongooseTestModule
} from '~/utils/mongodb-test'

describe('AuthService', () => {
	let service: AuthService
	const userData: IUser = {
		email: 'higor.test@gmail.com',
		firstName: 'Higor',
		image: 'jesttest',
		lastName: 'Alves',
		locale: {
			currency: 'BRL',
			language: 'Portuguese'
		},
		password: 'jesttest',
		role: 'client'
	}

	afterAll(async () => {
		await closeInMongodbConnection()
	})

	beforeAll(async () => {
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
			providers: [AuthService, LocalStrategy, JwtStrategy, AuthRepository]
		}).compile()

		service = module.get<AuthService>(AuthService)
	}, 30000)

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should register a new user', async () => {
		const { status } = await service.register(userData)
		expect(status).toBe(201)
	})

	it('should see the registered user', async () => {
		const loginData: ILogin = {
			email: userData.email,
			password: userData.password
		}
		const result = await service.checkUserExists(loginData.email)
		expect(result).toBeTruthy()
	})

	it('should create recovery password code', async () => {
		const { status } = await service.recoveryPassword(userData.email)
		expect(status).toBe(201)
	})
})
