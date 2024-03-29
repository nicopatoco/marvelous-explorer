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
        <div className="pt-12 pl-12 text-2xl font-bold xg:pt-4 md:pt-8 sm:pt-4 xg:pl-4 md:pl-8 sm:pl-4">{title}</div>
      )}
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
        <div className="text-black">{characters.length} RESULTS</div>
        <div className="pt-4">
          <CharacterList characters={characters} />
        </div>
      </div>
    </>
  )
}
