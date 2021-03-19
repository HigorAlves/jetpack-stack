import React from 'react'

type Props = {
	schema: string
}

function JsonLd({ schema }: Props): JSX.Element {
	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(schema)
			}}
		/>
	)
}

export default JsonLd
