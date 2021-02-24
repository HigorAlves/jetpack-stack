export interface ILogin {
	email: string
	password: string
}

export interface INewPassword {
	email: string
	password: string
	code: string
}

export interface IUpdatePassword {
	email: string
	oldPassword: string
	newPassword: string
}
