import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from './charactersSlice'
import comicsReducer from './comicSlice'

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    comics: comicsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
