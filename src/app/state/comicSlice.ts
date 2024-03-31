import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { now, oneDay } from '../functions/utils'
import { Comic, MarvelComicApiResponse } from '../types/comic'

interface CharacterComics {
  key: string
  value: Comic[]
  lastFetch: number // Each Characters's comics have their own lastFetch
}

interface ComicsState {
  characterComics: CharacterComics[]
  comics: Comic[]
  loading: boolean
  error: string | null
}

const initialState: ComicsState = {
  characterComics: [],
  comics: [],
  loading: true,
  error: null,
}

export const getComics = createAsyncThunk(
  'comics/getComics',
  async (characterId: string, { getState, rejectWithValue }) => {
    const state = getState() as { comics: ComicsState }
    const comicCache = state.comics.characterComics.find((c) => c.key.toString() === characterId)

    // This is a personal approach, in a normal situation there is a requirement
    // Check if the lastFetch is more than one day old
    if (comicCache && comicCache.lastFetch && now() - comicCache.lastFetch < oneDay()) {
      return { characterId, comics: comicCache.value, isCache: true }
    }

    try {
      // In case that I want all the comics, I just call this function in a while until a fetch the total comics.
      const res: MarvelComicApiResponse = (await axios.get(`/api/comics?characterId=${characterId}`)).data
      return { characterId, comics: res.data.results, isCache: false }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An unknown error occurred')
    }
  }
)

const comicsSlice = createSlice({
  name: 'comics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getComics.fulfilled, (state, action) => {
        const { characterId, comics, isCache } = action.payload

        const parseComics = comics.map((c) => ({
          ...c, // Spread operator to copy existing comic properties
          thumbnail: {
            ...c.thumbnail, // Existing thumbnail properties
            path: c.thumbnail.path.replace('http:', 'https:'), // Replace http with https in the path
          },
        }))

        const index = state.characterComics.findIndex((c) => c.key === characterId)
        if (index === -1) {
          // Add a new list of comics with current timestamp
          state.characterComics.push({
            key: characterId,
            value: parseComics,
            lastFetch: now(),
          })
        } else {
          if (!isCache) {
            // Update lastFetch timestamp only if we fectch the data
            state.characterComics[index].lastFetch = now()
          }
          // Update existing list of comics
          state.characterComics[index].value = parseComics
        }
        // To save the comics in the context
        state.comics = parseComics
        state.loading = false
      })
      .addCase(getComics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default comicsSlice.reducer
