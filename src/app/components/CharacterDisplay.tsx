/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from 'react'
import CharacterList from './CharacterList'
import { Character } from '../types/character'

interface Props {
  characters: Character[]
  setFilter: Dispatch<SetStateAction<string | undefined>>
  title?: string
}

export default function CharacterDisplay({ characters, setFilter, title }: Props) {
  return (
    <>
      {title && (
        <h2 className="pt-12 pl-12 text-2xl font-bold xg:pt-4 md:pt-8 sm:pt-4 xg:pl-4 md:pl-8 sm:pl-4">{title}</h2>
      )}
      <div className="flex flex-col p-12 xg:p-4 md:p-8 sm:p-4">
        <div className="flex flex-row justify-start gap-4">
          <label htmlFor="searchCharacter" className="sr-only">
            Search for a character
          </label>
          <img src="/search.svg" alt="Search" className="customSearchImg" />
          <input
            className="w-full uppercase focus:outline-none"
            type="text"
            onChange={(e) => setFilter(e.target.value)}
            placeholder="SEARCH A CHARACTER..."
            id="searchCharacter"
            aria-label="Search characters"
          />
        </div>
        <div className="my-4 border-t border-black"></div>
        <p className="text-black">{characters.length} RESULTS</p>
        <section className="pt-4">
          <CharacterList characters={characters} />
        </section>
      </div>
    </>
  )
}
