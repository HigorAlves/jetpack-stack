import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategys/jwt.strategy'
import { LocalStrategy } from './strategys/local.strategy'
import { UserModule } from '~/core/user/user.module'
import { JWT } from '~/constants'
import { RecoverySchema } from '~/schemas/recovery.schema'

@Module({
  imports: [
    UserModule,
    PassportModule,
    MongooseModule.forFeature([{ name: 'Recovery', schema: RecoverySchema }]),
    JwtModule.register({
      secret: JWT.secret,
      signOptions: { expiresIn: JWT.duration }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthRepository],
  controllers: [AuthController]
})
export class AuthModule {}
