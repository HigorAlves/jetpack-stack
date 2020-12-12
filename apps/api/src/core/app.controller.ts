import { Get, Controller, Render } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    const packageVersion = process.env.npm_package_version
    return { version: packageVersion }
  }
}
