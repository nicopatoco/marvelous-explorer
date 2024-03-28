import { Character } from '../types/character'
import CharacterCard from './CharacterCard'

interface Props {
  characters: Character[]
}

export default function CharacterList({ characters }: Props) {
  return (
    <div className="grid gap-4 justify-items-left 2xl:grid-col-7 xl:grid-cols-6 xg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2">
      {characters.map((character, i) => (
        <div key={`character-${i}`}>
          <CharacterCard character={character} />
        </div>
      ))}
    </div>
  )
}
