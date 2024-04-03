'use client'
import CharacterDisplay from '@/app/components/CharacterDisplay'
import LoadingDisplay from '@/app/components/LoadingDisplay'
import { useCharacters } from '@/app/context/CharactersContext'
import { useFavourites } from '@/app/context/FavouriteCharactersContext'
import { useMemo, useState } from 'react'

export default function Page() {
  const { characters } = useCharacters()
  const { favourites } = useFavourites()
  const [filter, setFilter] = useState<string | undefined>(undefined)

  const favouritesCharacters = characters.filter((c) => favourites.includes(c.id.toString()))

  const filteredCharacters = useMemo(() => {
    if (filter) {
      return favouritesCharacters.filter((character) => character.name.toLowerCase().includes(filter.toLowerCase()))
    }
    return favouritesCharacters
  }, [favouritesCharacters, filter])

  if (!characters) {
    return <LoadingDisplay />
  }

  return <CharacterDisplay characters={filteredCharacters} setFilter={setFilter} title="FAVOURITES" />
}
