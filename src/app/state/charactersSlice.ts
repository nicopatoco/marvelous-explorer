import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { now, oneDay } from '../functions/utils'
import { Character, MarvelApiResponse } from '../types/character'

interface CharactersState {
  characters: Character[]
  favourites: string[]
  lastFetch: number | null // Timestamp of the last fetch
  loading: boolean
  error: string | null
}

const initialState: CharactersState = {
  characters: [],
  favourites: [],
  lastFetch: null,
  loading: true,
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

    try {
      const res: MarvelApiResponse = (await axios.get('/api/characters?offset=0&limit=100&orderBy=name')).data
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
    addFavourite: (state, action: PayloadAction<string>) => {
      state.favourites.push(action.payload)
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter((id) => id !== action.payload)
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
        state.characters = characters.map((c) => ({
          ...c, // Spread operator to copy existing character properties
          thumbnail: {
            ...c.thumbnail, // Existing thumbnail properties
            path: c.thumbnail.path.replace('http:', 'https:'), // Replace http with https in the path
          },
        }))
        state.loading = false
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch characters'
      })
  },
})

export const { addFavourite, removeFavourite } = charactersSlice.actions
export default charactersSlice.reducer
