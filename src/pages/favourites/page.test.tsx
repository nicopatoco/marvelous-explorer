import { MOCKED_CHARACTERS } from '@/app/tests/mockedCharacters'
import { configureStore } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import useCharacters from '../../app/hooks/useCharacters'
import Page from '.'

// Explicitly cast the mocked function to jest.Mock
jest.mock('../../../app/hooks/useCharacters', () => ({
  __esModule: true,
  default: jest.fn(),
}))

// Cast useCharacters to its mocked type
const mockUseCharacters = useCharacters as jest.MockedFunction<typeof useCharacters>

// Define your mock store with favourites
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

describe('FavouritesPage component', () => {
  beforeEach(() => {
    mockUseCharacters.mockImplementation(() => ({
      characters: MOCKED_CHARACTERS,
      favourites: [MOCKED_CHARACTERS[1].id.toString()],
      loading: false,
      error: null,
    }))
  })

  test('renders only favourite characters', () => {
    render(
      <Provider store={customStore}>
        <Page />
      </Provider>
    )

    // Verify that the favourite character is displayed
    expect(screen.getByText(/A-Bomb/i)).toBeInTheDocument()

    // Verify that non-favourite characters are not displayed
    expect(screen.queryByText(/3-D Man/i)).not.toBeInTheDocument()
  })

  test('renders "FAVOURITES" title', () => {
    render(
      <Provider store={customStore}>
        <Page />
      </Provider>
    )

    // Check for the Favourites title
    expect(screen.getByText(/FAVOURITES/i)).toBeInTheDocument()
  })
})
