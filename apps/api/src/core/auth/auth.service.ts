import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { AuthRepository } from './auth.repository'
import { UserService } from '~/core/user/user.service'
import { MyLogger } from '~/interceptors/logger.interceptor'
import {
	ILogin,
	INewPassword,
	IUpdatePassword
} from '~/interfaces/authentication'
import { IUser } from '~/interfaces/user'
import { EmailTemplates, sendMail } from '~/lib/mail'

@Injectable()
export class AuthService {
	constructor(
		private repository: AuthRepository,
		private usersService: UserService,
		private jwtService: JwtService,
		private logger: MyLogger
	) {
		this.logger.setContext('Authentication')
	}

	async checkUserPassword(user: ILogin): Promise<boolean> {
		const { data } = await this.usersService.getByEmail(user.email)

		if (data) {
			try {
				return bcrypt.compareSync(user.password, data.password)
			} catch (error) {
				this.logger.error(error)
				return false
			}
		}

		return false
	}

	async checkUserExists(email: string): Promise<boolean> {
		const result = await this.usersService.getByEmail(email)
		return !!result.data
	}

	async login(login: ILogin): Promise<IResponse> {
		const isValid = await this.checkUserPassword(login)

		if (isValid) {
			const { data } = await this.usersService.getByEmail(login.email)
			const payload = { email: data.email, roles: [data.role] }

			this.logger.log('New user loggin', { user: data.email })
			return {
				message: 'Successfuly logged in',
				status: 200,
				token: this.jwtService.sign(payload),
				error: false
			}
		}

		this.logger.log('User typed wrong password or email')
		return {
			message: 'Email or password wrong.',
			status: 403,
			error: true
		}
	}

	async register(data: IUser): Promise<IResponse> {
		const userExists = await this.checkUserExists(data.email)

		if (!userExists) {
			await this.usersService.create(data)
			try {
				await sendMail({
					from: 'higorhaalves@gmail.com',
					to: data.email,
					subject: 'Bem vindo a nossa plataforma',
					dynamic_template_data: {
						name: `${data.firstName} ${data.lastName}`
					},
					templateId: EmailTemplates.WELCOME
				})
			} catch (e) {
				this.logger.log(`Cannot send welcome email for ${data.email}`)
			}

			this.logger.log('A new user inside our DB 🎉🎉')

			return {
				error: false,
				message: 'User has been created',
				status: 201
			}
		}

		this.logger.log('Something went wrong and we cannot create the user', {
			user: data.email
		})
		return {
			status: 409,
			message: 'This user cannot be created. Its already in use!',
			error: true
		}
	}

	async recoveryPassword(email: string): Promise<IResponse<string>> {
		const alreadyHaveActiveCode = await this.repository.alreadyGenerated(email)

		if (!alreadyHaveActiveCode) {
			const code = await this.repository.createRecoveryCode(email)

			this.logger.warn('User created a recovery password code', { user: email })
			return {
				error: false,
				message: 'Recovery code created successfully.',
				status: 201,
				data: code as string
			}
		}

		this.logger.warn('There is alredy a code for this email', { user: email })
		return {
			status: 409,
			error: true,
			message: 'There is already a code generated for this email.'
		}
	}

	async newPassword(data: INewPassword): Promise<IResponse> {
		const user = await this.checkUserExists(data.email)
		const isCodeValid = await this.repository.verifyRecoverToken(data.code)

		if (!user && !isCodeValid) {
			this.logger.error('Can`t set new password for user.', {
				user: data.email
			})
			return {
				error: true,
				message: 'Your code our email is not right',
				status: 406
			}
		}

		const { password } = await this.usersService.updatePassword(
			data.email,
			data.password
		)

		if (password) {
			this.repository.deleteRecoverToken(data.code)

			this.logger.log('User has updated the password', { user: data.email })
			return {
				status: 204,
				error: false,
				message: 'Your password has been changed'
			}
		}
	}

	async updatePassword(user: IUpdatePassword): Promise<IResponse> {
		try {
			const { data } = await this.usersService.getByEmail(user.email)
			const isPasswordEqual = bcrypt.compareSync(
				user.oldPassword,
				data.password
			)

			if (isPasswordEqual) {
				const password = await bcrypt.hashSync(user.newPassword, 10)
				const hasChange = await this.usersService.updatePassword(
					data.email,
					password
				)

				if (hasChange) {
					this.logger.log('Password has been updated', { user: data.email })
					return {
						status: 204,
						error: false,
						message: 'Your password has been updated'
					}
				}

				this.logger.warn('Password has not been updated', { user: data.email })
				return {
					status: 409,
					error: true,
					message: 'We cant update this password'
				}
			}
		} catch (error) {
			this.logger.error(
				'Something goes wrong while someone tries to update password',
				{ error }
			)
			return { error: error, message: 'Something goes wrong', status: 500 }
		}
	}
}
