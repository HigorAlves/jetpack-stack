import React from 'react'

type Props = {
	languages: {
		[key: string]: string
	}
	isLoading: boolean
	errorMessage?: string
}

const RepositoryLanguages: React.FC<Props> = ({
	languages,
	isLoading,
	errorMessage
}) => {
	if (errorMessage) {
		return (
			<div>
				<h1>
					An error has occurred while getting language information:{' '}
					{errorMessage}
				</h1>
			</div>
		)
	}

	return (
		<ul>
			<h3>Used languages (in bytes)</h3>
			{isLoading ? (
				<li>
					<p>Fetching language informations</p>
				</li>
			) : (
				Object.entries(languages).map(([language, amount]) => (
					<li key={language}>
						{language}: {amount}
					</li>
				))
			)}
		</ul>
	)
}

export default RepositoryLanguages
