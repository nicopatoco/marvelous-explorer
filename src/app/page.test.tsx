import { configureStore } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import useCharacters from './hooks/useCharacters'
import Home from './page'
import { MOCKED_CHARACTERS } from './tests/mockedCharacters'

// Explicitly cast the mocked function to jest.Mock
jest.mock('./hooks/useCharacters', () => ({
  __esModule: true,
  default: jest.fn(),
}))

// Cast useCharacters to its mocked type
const mockUseCharacters = useCharacters as jest.MockedFunction<typeof useCharacters>

const customStore = configureStore({
  reducer: {
    characters: (
      state = {
        characters: [],
        favourites: [],
        lastFetch: null,
        loading: true,
        error: null,
      }
    ) => {
      return state
    },
  },
})

describe('Home component', () => {
  test('renders loading display when loading', () => {
    mockUseCharacters.mockImplementation(() => ({
      characters: [],
      favourites: [],
      loading: true,
      error: null,
    }))
    render(<Home />)
    expect(screen.getByTestId('loading-display')).toBeInTheDocument()
  })

  test('renders error display when there is an error', () => {
    mockUseCharacters.mockImplementation(() => ({
      characters: [],
      favourites: [],
      loading: false,
      error: 'Test error',
    }))
    render(<Home />)
    expect(screen.getByText(/test error/i)).toBeInTheDocument()
  })

  test('renders character display when characters are loaded', () => {
    mockUseCharacters.mockImplementation(() => ({
      characters: MOCKED_CHARACTERS,
      favourites: [],
      loading: false,
      error: null,
    }))

    render(
      <Provider store={customStore}>
        <Home />
      </Provider>
    )

    expect(screen.getByText(/A-Bomb/i)).toBeInTheDocument()
    expect(screen.getByText(/3-D Man/i)).toBeInTheDocument()
  })

  test('filters characters based on filter state', () => {
    mockUseCharacters.mockImplementation(() => ({
      characters: MOCKED_CHARACTERS,
      favourites: [],
      loading: false,
      error: null,
    }))

    render(
      <Provider store={customStore}>
        <Home />
      </Provider>
    )

    // Before filter
    expect(screen.getByText(/A-Bomb/i)).toBeInTheDocument()
    expect(screen.getByText(/3-D Man/i)).toBeInTheDocument()

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'bomb' } })

    // After filter
    expect(screen.getByText(/A-Bomb/i)).toBeInTheDocument()
    expect(screen.queryByText(/3-D Man/i)).not.toBeInTheDocument()
  })
})
