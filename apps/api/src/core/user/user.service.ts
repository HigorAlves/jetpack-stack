import { Injectable, Logger } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '~/core/user/dto/createUser.dto'
import { UpdateUserDto } from '~/core/user/dto/updateUser.dto'
import { UserRepository } from '~/core/user/user.repository'
import { MyLogger } from '~/interceptors/logger.interceptor'
import { IUser } from '~/interfaces/user'
import { UserDocument } from '~/schemas/user.schema'

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private logger: MyLogger
  ) {
    this.logger.setContext('UserService')
  }

  async getByEmail(email: string): Promise<IResponse<UserDocument>> {
    this.logger.log('Getting user info by email')
    const user = await this.userRepository.get(email)

    return {
      error: false,
      message: 'Data from user',
      status: 200,
      data: user
    }
  }

  async findAll(): Promise<IResponse<IUser[]>> {
    this.logger.log('Getting a list of users')
    const users = await this.userRepository.getAll()

    return {
      error: false,
      message: 'List of all users',
      status: 200,
      data: users
    }
  }

  async create(data: IUser): Promise<IResponse<UserDocument>> {
    const alreadyInUse = await this.userRepository.checkEmailAlreadyInUse(
      data.email
    )

    if (alreadyInUse) {
      this.logger.warn('This email is already in use', { email: data.email })
      return {
        status: 408,
        message: 'This email is already in use',
        error: true
      }
    }

    data.password = await bcrypt.hashSync(data.password, 10)
    const user = await this.userRepository.createUser(data)

    this.logger.log('New user created', { user: data.email })

    return {
      status: 201,
      message: 'User created successfully',
      error: false,
      data: user
    }
  }

  async delete(id: string): Promise<IResponse<boolean>> {
    await this.userRepository.deleteUser(id)
    this.logger.log('Removing an user', { userId: id })

    return {
      status: 200,
      error: false,
      message: 'User has been removed'
    }
  }

  async update(id: string, user: IUser) {
    this.logger.log('Updated user data', { user: user.email })
    delete user.email
    return this.userRepository.updateUser(user, id)
  }

  async updatePassword(email: string, password: string): Promise<UserDocument> {
    this.logger.log('Updated user password', { user: email })
    const passwordHash = bcrypt.hashSync(password, 10)
    return this.userRepository.updatePassword(email, passwordHash)
  }
}
