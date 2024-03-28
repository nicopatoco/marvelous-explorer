import { Character } from '../types/character'

interface Props {
  characters: Character[]
}

export default function CharacterList({ characters }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {characters.map((character, i) => (
        <div key={`character-${i}`}>{character.name}</div>
      ))}
    </div>
  )
}
