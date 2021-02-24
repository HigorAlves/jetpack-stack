import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from 'src/api/user/user.controller'

describe('UserController', () => {
	let controller: UserController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController]
		}).compile()

		controller = module.get<UserController>(UserController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
