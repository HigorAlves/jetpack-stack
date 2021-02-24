/* eslint-disable camelcase */
import { setApiKey, send } from '@sendgrid/mail'

import { SENDGRID } from '~/constants'

setApiKey(SENDGRID)

export enum EmailTemplates {
	PASSWORD_RESET = '',
	CONFIRM_ACCOUNT = '',
	WELCOME = ''
}

export interface IMailMessage {
	to: string
	from: string
	subject: string
	templateId: EmailTemplates
	dynamic_template_data: {
		name: string
		confirm_account_url?: string
		reset_password_url?: string
	}
}

export async function sendMail(msg: IMailMessage): Promise<boolean> {
	const response = await send(msg)

	if (response[0].statusCode) {
		return true
	} else {
		return false
	}
}
