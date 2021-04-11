import { MongooseModule } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongodb: MongoMemoryServer

export const rootMongooseTestModule = () =>
	MongooseModule.forRootAsync({
		useFactory: async () => {
			mongodb = new MongoMemoryServer()
			const uri = await mongodb.getUri()
			return {
				uri,
				useCreateIndex: true
			}
		}
	})

export const closeInMongodbConnection = async () => {
	if (mongodb) {
		await mongoose.connection.db.dropDatabase()
		await mongoose.disconnect()
		await mongodb.stop()
	}
}
