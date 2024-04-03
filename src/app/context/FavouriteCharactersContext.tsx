import { ReactNode, createContext, useContext, useState } from 'react'

interface CharactersContextType {
  favourites: string[]
  addFavourite: (id: string) => void
  removeFavourite: (id: string) => void
}

const FavouriteCharactersContext = createContext<CharactersContextType | undefined>(undefined)

export const useFavourites = () => {
  const context = useContext(FavouriteCharactersContext)
  if (context === undefined) {
    throw new Error('useCharacters must be used within a CharactersProvider')
  }
  return context
}

export const FavouritesCharactersProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<string[]>([])

  const addFavourite = (id: string) => {
    setFavourites((currentFavourites) => [...currentFavourites, id])
  }

  const removeFavourite = (id: string) => {
    setFavourites((currentFavourites) => currentFavourites.filter((favouriteId) => favouriteId !== id))
  }

  return (
    <FavouriteCharactersContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouriteCharactersContext.Provider>
  )
}
