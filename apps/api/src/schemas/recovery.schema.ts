import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type RecoveryDocument = Document

@Schema()
export class Recovery {
	@Prop()
	email: string

	@Prop()
	code: string

	@Prop({ type: Date, expires: 60, default: new Date() })
	createdAt: Date
}

export const RecoverySchema = SchemaFactory.createForClass(Recovery)
