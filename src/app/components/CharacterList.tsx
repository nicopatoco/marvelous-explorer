import { Character } from '../types/character'
import CharacterCard from './CharacterCard'

interface Props {
  characters: Character[]
}

export default function CharacterList({ characters }: Props) {
  return (
    <div
      role="list"
      className="grid gap-4 justify-items-left 4xl:grid-cols-8 3xl:grid-cols-7 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-2"
    >
      <h2 className="sr-only">Character List</h2>
      {characters.map((character, i) => (
        <div key={`character-${i}`} role="listitem">
          <CharacterCard character={character} />
        </div>
      ))}
    </div>
  )
}
