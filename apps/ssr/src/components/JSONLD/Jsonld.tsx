import React from 'react'

type Props = {
	schema: string
}

const JsonLd: React.FC<Props> = ({ schema }) => (
	<script
		type='application/ld+json'
		dangerouslySetInnerHTML={{
			__html: JSON.stringify(schema)
		}}
	/>
)

export default JsonLd
