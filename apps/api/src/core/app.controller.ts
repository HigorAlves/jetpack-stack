import { Get, Controller, Render } from '@nestjs/common'

import { MyLogger } from '~/interceptors/logger.interceptor'

@Controller()
export class AppController {
  constructor(private myLogger: MyLogger) {
    // Due to transient scope, CatsService has its own unique instance of MyLogger,
    // so setting context here will not affect other instances in other services
    this.myLogger.setContext('CatsService')
    // this.logger.setContext('APP-CONTROLLER')
  }

  @Get()
  @Render('index')
  root() {
    const packageVersion = process.env.npm_package_version
    this.myLogger.customLog()
    return { version: packageVersion }
  }
}
