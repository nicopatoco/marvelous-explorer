import { MOCKED_CHARACTERS } from '@/app/tests/mockedCharacters'
import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import useCharacters from '../../../hooks/useCharacters'
import useComics from '../../../hooks/useComics'
import Page from './page'

jest.mock('../../../hooks/useComics', () => ({
  __esModule: true,
  default: jest.fn(),
}))

jest.mock('../../../hooks/useCharacters', () => ({
  __esModule: true,
  default: jest.fn(),
}))

// Cast useCharacters to its mocked type
const mockUseCharacters = useCharacters as jest.MockedFunction<typeof useCharacters>
// Cast useComics to its mocked type
const mockUseComics = useComics as jest.MockedFunction<typeof useComics>

const mockCharactersReducer = (state = { characters: [], favourites: [], loading: false, error: null }) => {
  return state
}

const mockComicsReducer = (state = { comics: [], loading: true, error: null }) => {
  return state
}

const mockStore = configureStore({
  reducer: {
    characters: mockCharactersReducer,
    comics: mockComicsReducer,
  },
})

describe('DetailsPage component', () => {
  it('renders loading display when loading characters', () => {
    mockUseComics.mockImplementation(() => ({
      characterComics: [],
      comics: [],
      loading: false,
      error: null,
    }))

    mockUseCharacters.mockImplementation(() => ({
      characters: MOCKED_CHARACTERS,
      favourites: [],
      loading: true,
      error: null,
    }))

    render(<Page params={{ characterId: MOCKED_CHARACTERS[0].id.toString() }} />)

    expect(screen.getByTestId('loading-display')).toBeInTheDocument()
  })

  it('renders loading display when loading comics', () => {
    mockUseComics.mockImplementation(() => ({
      characterComics: [],
      comics: [],
      loading: true,
      error: null,
    }))

    mockUseCharacters.mockImplementation(() => ({
      characters: MOCKED_CHARACTERS,
      favourites: [],
      loading: false,
      error: null,
    }))

    render(<Page params={{ characterId: MOCKED_CHARACTERS[0].id.toString() }} />)

    expect(screen.getByTestId('loading-display')).toBeInTheDocument()
  })

  test('renders error display when there is an error in characters', () => {
    mockUseComics.mockImplementation(() => ({
      characterComics: [],
      comics: [],
      loading: false,
      error: null,
    }))

    mockUseCharacters.mockImplementation(() => ({
      characters: [],
      favourites: [],
      loading: false,
      error: 'Test error',
    }))
    render(<Page params={{ characterId: MOCKED_CHARACTERS[0].id.toString() }} />)
    expect(screen.getByText(/test error/i)).toBeInTheDocument()
  })

  test('renders error display when there is an error in comics', () => {
    mockUseComics.mockImplementation(() => ({
      characterComics: [],
      comics: [],
      loading: false,
      error: 'Test error',
    }))

    mockUseCharacters.mockImplementation(() => ({
      characters: [],
      favourites: [],
      loading: false,
      error: null,
    }))
    render(<Page params={{ characterId: MOCKED_CHARACTERS[0].id.toString() }} />)
    expect(screen.getByText(/test error/i)).toBeInTheDocument()
  })

  test('display Banner, image and character', () => {
    mockUseComics.mockImplementation(() => ({
      characterComics: [],
      comics: [],
      loading: false,
      error: null,
    }))

    mockUseCharacters.mockImplementation(() => ({
      characters: MOCKED_CHARACTERS,
      favourites: [MOCKED_CHARACTERS[0].id.toString()], // Assuming the first character is marked as favourite
      loading: false,
      error: null,
    }))

    const mockStore = configureStore({
      reducer: {
        characters: mockCharactersReducer,
        comics: mockComicsReducer,
      },
    })

    render(
      <Provider store={mockStore}>
        <Page params={{ characterId: MOCKED_CHARACTERS[0].id.toString() }} />
      </Provider>
    )

    expect(screen.getByText(MOCKED_CHARACTERS[0].name)).toBeInTheDocument()
    const selectedImage = screen.getByAltText(`Character ${MOCKED_CHARACTERS[0].id.toString()}`)
    expect(selectedImage).toBeInTheDocument()
  })
})
