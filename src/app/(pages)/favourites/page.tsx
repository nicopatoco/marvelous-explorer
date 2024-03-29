'use client'
import { useMemo, useState } from 'react'
import useCharacters from '@/app/hooks/useCharacters'
import LoadingDisplay from '@/app/components/LoadingDisplay'
import ErrorDisplay from '@/app/components/ErrorDisplay'
import CharacterDisplay from '@/app/components/CharacterDisplay'

export default function Page() {
  const { characters, favourites, loading, error } = useCharacters()
  const [filter, setFilter] = useState<string | undefined>(undefined)

  const favouritesCharacters = characters.filter((c) => favourites.includes(c.id.toString()))

  const filteredCharacters = useMemo(() => {
    if (filter) {
      return favouritesCharacters.filter((character) => character.name.toLowerCase().includes(filter.toLowerCase()))
    }
    return favouritesCharacters
  }, [favouritesCharacters, filter])

  if (loading) {
    return <LoadingDisplay />
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  return <CharacterDisplay characters={filteredCharacters} setFilter={setFilter} title="FAVOURITES" />
}
