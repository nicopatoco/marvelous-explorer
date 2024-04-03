import { createContext, useContext, useState, ReactNode } from 'react'
import { Character } from '@/app/types/character'

interface CharactersContextType {
  characters: Character[]
  setCharacters: (characters: Character[]) => void
}

const CharactersContext = createContext<CharactersContextType | undefined>(undefined)

export const useCharacters = () => {
  const context = useContext(CharactersContext)
  if (!context) {
    throw new Error('useCharacters must be used within a CharactersProvider')
  }
  return context
}

export const CharactersProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([])

  return <CharactersContext.Provider value={{ characters, setCharacters }}>{children}</CharactersContext.Provider>
}
