/* eslint-disable @next/next/no-img-element */
'use client'
import { useMemo, useState } from 'react'
import CharacterList from '../components/CharacterList'
import ErrorDisplay from '../components/ErrorDisplay'
import useCharacters from '../hooks/useCharacters'
import LoadingDisplay from '../components/LoadingDisplay'

export default function CharactersPage() {
  const [filter, setFilter] = useState<string | undefined>(undefined)
  const { characters, loading, error } = useCharacters()

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

  return (
    <>
      {filteredCharacters?.length > 0 && (
        <>
          <div className="flex flex-col px-12 pt-12">
            <div className="flex flex-row justify-start gap-4">
              <img src="/search.svg" alt="search logo" className="customSearchImg" />
              <input
                className="w-full uppercase focus:outline-none"
                type="text"
                onChange={(e) => setFilter(e.target.value)}
                placeholder="SEARCH A CHARACTER..."
              />
            </div>
            <div className="my-4 border-t border-black"></div>
            <div className="text-black">{filteredCharacters.length} RESULTS</div>
          </div>
          <CharacterList characters={filteredCharacters} />
        </>
      )}
    </>
  )
}
