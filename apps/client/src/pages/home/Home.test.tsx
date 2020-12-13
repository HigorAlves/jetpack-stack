import React from 'react'

import { render, act, fireEvent } from '@testing-library/react'

import { HomePage } from './Home'

describe('Home screen', () => {
  it('renders learn react link', () => {
    const { getByText } = render(<HomePage />)
    const linkElement = getByText(/Learn React/i)
    expect(linkElement).toBeInTheDocument()
  })

  it('should display the page in English', () => {
    const { getByText } = render(<HomePage />)
    expect(getByText(/English/i)).toBeInTheDocument()
    expect(
      getByText(/Edit the src\/Home.tsx file and save to reload./i)
    ).toBeInTheDocument()
    expect(getByText(/Learn React/i)).toBeInTheDocument()
  })

  it('should toggle language on click', () => {
    const { getByText } = render(<HomePage />)

    act(() => {
      fireEvent.click(getByText(/English/i))
    })

    expect(getByText(/Português/i)).toBeInTheDocument()
    expect(
      getByText(/Edite o arquivo src\/Home.tsx e salve para atualizar/i)
    ).toBeInTheDocument()
    expect(getByText(/Aprenda React/i)).toBeInTheDocument()

    act(() => {
      fireEvent.click(getByText(/Português/i))
    })

    expect(getByText(/English/i)).toBeInTheDocument()
    expect(
      getByText(/Edit the src\/Home.tsx file and save to reload./i)
    ).toBeInTheDocument()
    expect(getByText(/Learn React/i)).toBeInTheDocument()
  })
})
