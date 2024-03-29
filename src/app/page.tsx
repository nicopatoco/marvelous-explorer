'use client'
import { useMemo, useState } from 'react'
import useCharacters from './hooks/useCharacters'
import LoadingDisplay from './components/LoadingDisplay'
import ErrorDisplay from './components/ErrorDisplay'
import CharacterDisplay from './components/CharacterDisplay'

export default function Home() {
  const { characters, loading, error } = useCharacters()
  const [filter, setFilter] = useState<string | undefined>(undefined)

  const filteredCharacters = useMemo(() => {
    if (filter) {
      return characters.filter((character) => character.name.toLowerCase().includes(filter.toLowerCase()))
    }
    return characters
  }, [characters, filter])

  if (loading) {
    return <LoadingDisplay />
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  return <CharacterDisplay characters={filteredCharacters} setFilter={setFilter} />
}
