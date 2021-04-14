import React from 'react'

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import HomePage from '~/pages/index'

describe('Home Page', () => {
	it('should render the colors correctly', () => {
		const { container } = render(<HomePage />)

		expect(container.firstChild).toBeDefined()
	})
})
