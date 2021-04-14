import React from 'react'

import { useHistory } from 'react-router-dom'

export function Login() {
	const history = useHistory()

	function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		event.preventDefault()
		history.push('/dashboard')
	}

	return (
		<main>
			<h1>Login page</h1>
			<form onSubmit={handleSubmit}>
				<input name={'username'} placeholder={'E-mail'} type={'email'} />
				<input name={'password'} placeholder={'Password'} type={'password'} />
				<button type={'submit'}>Login</button>
			</form>
		</main>
	)
}
