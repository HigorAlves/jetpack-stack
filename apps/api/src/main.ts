import { join } from 'path'

import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as Sentry from '@sentry/node'
import * as rateLimit from 'express-rate-limit'
import * as helmet from 'helmet'

import { AppModule } from '~/core/app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const configService = app.get(ConfigService)
	const packageVersion = process.env.npm_package_version
	const port = configService.get('port')
	const sentry = configService.get('sentry')

	app.setViewEngine('hbs')
	app.useStaticAssets(join(__dirname, '..', 'public'))
	app.setBaseViewsDir(join(__dirname, '..', 'views'))

	const options = new DocumentBuilder()
		.setTitle('NestJS API Template')
		.setDescription('This is API Version')
		.setVersion(packageVersion)
		.addTag('api')
		.build()
	const document = SwaggerModule.createDocument(app, options)

	SwaggerModule.setup('api', app, document)
	Sentry.init({ dsn: sentry.dsn })

	app.use(helmet())
	app.enableCors()
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100 // limit each IP to 100 requests per windowMs
		})
	)

	await app.listen(port)
	Logger.log(`🚀 Server running on ${await app.getUrl()}`, 'BOOTSTRAP')
}

bootstrap()
