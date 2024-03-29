import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { generateMD5, now, oneDay } from '../functions/utils'
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
  loading: false,
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
      // Require by the Api, we need to generate the hash using public and private key
      const litmit = 20
      const timestamp = new Date().getTime()
      const publicKey = `${process.env.PUBLIC_MARVEL_API_KEY}`
      const privateKey = `${process.env.PRIVATE_MARVEL_API_KEY}`
      const hash = generateMD5(timestamp + privateKey + publicKey)
      const type = 'comic'

      const apiUrl = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?formatType=${type}&limit=${litmit}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}`

      const res: MarvelComicApiResponse = (await axios.get(apiUrl)).data

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

        const index = state.characterComics.findIndex((c) => c.key === characterId)
        if (index === -1) {
          // Add a new list of comics with current timestamp
          state.characterComics.push({
            key: characterId,
            value: comics,
            lastFetch: now(),
          })
        } else {
          if (!isCache) {
            // Update lastFetch timestamp only if we fectch the data
            state.characterComics[index].lastFetch = now()
          }
          // Update existing list of comics
          state.characterComics[index].value = comics
        }
        // To save the comics in the context
        state.comics = comics
        state.loading = false
      })
      .addCase(getComics.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default comicsSlice.reducer
