import {
  Injectable,
  InternalServerErrorException,
  Logger
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectID } from 'mongodb'
import { Model } from 'mongoose'

import { CreateUserDto } from '~/core/user/dto/createUser.dto'
import { UpdateUserDto } from '~/core/user/dto/updateUser.dto'
import { UserDocument } from '~/schemas/user.schema'
import { IUser } from '~/types/user'

@Injectable()
export class UserRepository {
  private logger = new Logger('USER_REPOSITORY')

  constructor(@InjectModel('User') private Database: Model<UserDocument>) {}

  async get(email: string): Promise<UserDocument> {
    return await this.Database.findOne({ email }).exec()
  }

  async getAll(): Promise<IUser[]> {
    return await this.Database.find().exec()
  }

  async createUser(createUserDTO: CreateUserDto): Promise<UserDocument> {
    const data: IUser = { ...createUserDTO, role: 'client' }

    const user = new this.Database(data)

    try {
      await user.save()
    } catch (error) {
      this.logger.error('Failed to create user data', error.stack)
      throw new InternalServerErrorException()
    }
    return user
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.Database.deleteOne({
      _id: new ObjectID(id)
    })

    if (result.deletedCount == 0) {
      return false
    }

    return true
  }

  async checkEmailAlreadyInUse(email: string) {
    return this.Database.findOne({ email })
  }

  async updateUser(user: UpdateUserDto, id: string): Promise<UserDocument> {
    return await this.Database.findOneAndUpdate({ id }, user).exec()
  }

  async updatePassword(email: string, password: string): Promise<any> {
    const user = await this.Database.findOne({ email }).exec()

    user.update({ password })
    return user
  }
}
