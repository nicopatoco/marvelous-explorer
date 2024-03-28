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
      {characters?.length > 0 && (
        <>
          <div className="flex flex-col p-12 xg:p-4 md:p-8 sm:p-4">
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
            <div className="pt-4">
              <CharacterList characters={filteredCharacters} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
