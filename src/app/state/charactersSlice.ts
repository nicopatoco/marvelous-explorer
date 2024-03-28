import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { generateMD5, now, oneDay } from '../functions/utils'
import { Character, MarvelApiResponse } from '../types/character'

interface CharactersState {
  characters: Character[]
  lastFetch: number | null // Timestamp of the last fetch
  loading: boolean
  error: string | null
}

const initialState: CharactersState = {
  characters: [],
  lastFetch: null,
  loading: false,
  error: null,
}

export const getCharacters = createAsyncThunk(
  'characters/getCharacters',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { characters: CharactersState }

    // This is a personal approach, in a normal situation there is a requirement
    // Check if the lastFetch is more than one day old
    if (state.characters.lastFetch && now() - state.characters.lastFetch < oneDay()) {
      return state.characters.characters
    }

    // Require by the Api, we need to generate the hash using public and private key
    const litmit = 100
    const timestamp = new Date().getTime()
    const publicKey = `${process.env.PUBLIC_MARVEL_API_KEY}`
    const privateKey = `${process.env.PRIVATE_MARVEL_API_KEY}`
    const hash = generateMD5(timestamp + privateKey + publicKey)

    const apiUrl = `https://gateway.marvel.com/v1/public/characters?limit=${litmit}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`

    try {
      const res: MarvelApiResponse = (await axios.get(apiUrl)).data
      dispatch(charactersSlice.actions.updateLastFetch(now()))
      // Just for the challenge, I want to have all the images
      return res.data.results
        .filter((c) => !c.thumbnail.path.toLowerCase().includes('image_not_available'))
        .slice(0, 50)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An unknown error occurred')
    }
  }
)

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    // Reducer to update the last fetch timestamp
    updateLastFetch: (state, action: PayloadAction<number>) => {
      state.lastFetch = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        const characters = action.payload
        state.characters = characters
        state.loading = false
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch characters'
      })
  },
})

export default charactersSlice.reducer
