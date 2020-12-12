import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { AuthRepository } from './auth.repository'
import { CreateUserDto } from '~/core/user/dto/createUser.dto'
import { UserService } from '~/core/user/user.service'
import { EmailTemplates, sendMail } from '~/lib/mail'
import { UserDocument } from '~/schemas/user.schema'
import { ResponseType } from '~/types/response'

@Injectable()
export class AuthService {
  constructor(
    private repository: AuthRepository,
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    plainPassword: string
  ): Promise<{ success: boolean; data?: UserDocument }> {
    const user = await this.usersService.getByEmail(email)

    if (user) {
      try {
        const isPasswordEqual = bcrypt.compareSync(plainPassword, user.password)
        if (isPasswordEqual) {
          return { success: true, data: user }
        }
      } catch (error) {
        return { success: false }
      }
    }

    return { success: false }
  }

  async checkUseExists(email: string): Promise<boolean> {
    const user = await this.usersService.getByEmail(email)

    if (user) {
      return true
    }

    return false
  }

  async login(data: {
    email: string
    password: string
  }): Promise<ResponseType> {
    const result = await this.validateUser(data.email, data.password)

    if (result.success) {
      const payload = { email: result.data.email, roles: [result.data.role] }
      return {
        token: this.jwtService.sign(payload),
        message: 'Successfully logged in',
        status: 200,
        error: false
      }
    } else {
      return {
        message: 'Email or password wrong.',
        status: 403,
        error: false
      }
    }

    return { message: 'Invalid password or email', error: true, status: 401 }
  }

  async register(userDTO: CreateUserDto): Promise<ResponseType> {
    const user = await this.usersService.getByEmail(userDTO.email)

    if (!user) {
      const result = await this.usersService.create(userDTO)
      await sendMail({
        from: 'higorhaalves@gmail.com',
        to: userDTO.email,
        subject: 'Bem vindo a nossa plataforma',
        dynamic_template_data: {
          name: `${userDTO.firstName} ${userDTO.lastName}`
        },
        templateId: EmailTemplates.WELCOME
      })

      return result
    }

    return {
      status: 400,
      message: 'This user already exists!',
      error: false
    }
  }

  async recoveryPassword(email: string): Promise<ResponseType> {
    const alreadyHaveActiveCode = await this.repository.alreadyGenerated(email)

    if (!alreadyHaveActiveCode) {
      await this.repository.createRecoveryCode(email)
      return {
        error: false,
        message: 'Recovery code created successfully.',
        status: 200
      }
    } else {
      return {
        status: 418,
        error: false,
        message: 'There is already a code generated for this email.'
      }
    }
  }

  async newPassword({ email, password, code }): Promise<ResponseType> {
    const user = await this.usersService.getByEmail(email)
    const isCodeValid = await this.repository.verifyRecoverToken(code)
    const responseData = {
      status: 400,
      error: true,
      message: 'Was not possible change this password'
    }

    if (!user) {
      responseData.message = 'This user is not listed'
      return responseData
    }
    if (!isCodeValid) {
      responseData.message = 'This code is no more valid'
      return responseData
    }

    const result = await this.usersService.updatePassword(email, password)

    if (result.password) {
      this.repository.deleteRecoverToken(code)

      return {
        status: 200,
        error: false,
        message: 'Password updated'
      }
    }

    return responseData
  }

  async updatePassword({
    email,
    oldPassword,
    newPassword
  }): Promise<ResponseType> {
    const user = await this.usersService.getByEmail(email)

    if (user) {
      try {
        const isPasswordEqual = bcrypt.compareSync(oldPassword, user.password)

        if (isPasswordEqual) {
          const password = await bcrypt.hashSync(newPassword, 10)
          const result = await this.usersService.updatePassword(email, password)

          if (result) {
            return {
              status: 200,
              error: false,
              message: 'Password updated'
            }
          } else {
            return {
              status: 400,
              error: true,
              message: 'Password was not updated'
            }
          }
        }
      } catch (error) {
        return { error: error, message: 'Something goes wrong', status: 500 }
      }
    }
  }
}
