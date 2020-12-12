import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { v4 as uuid } from 'uuid'

import { RecoveryDocument } from '~/schemas/recovery.schema'

@Injectable()
export class AuthRepository {
  private logger = new Logger('AUTH_REPOSITORY')

  constructor(
    @InjectModel('Recovery') private RecoveryModel: Model<RecoveryDocument>
  ) {}

  async alreadyGenerated(email: string) {
    return await this.RecoveryModel.findOne({ email }).exec()
  }

  async createRecoveryCode(email: string): Promise<boolean> {
    const code: string = uuid()
    const recovery = new this.RecoveryModel({ email, code })

    try {
      recovery.save()
      return true
    } catch (e) {
      this.logger.error('ERROR: ', e)
      return false
    }
  }

  async verifyRecoverToken(code: string) {
    return await this.RecoveryModel.findOne({ code }).exec()
  }

  async deleteRecoverToken(code: string) {
    const token = await this.RecoveryModel.findOne({ code }).exec()
    return await this.RecoveryModel.deleteOne({ id: token.id })
  }
}
