import { Character } from '../types/character'
import Image from 'next/image'

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="flex flex-col" style={{ width: '172.5px', minHeight: '245.97px' }}>
      <div className="flex flex-col">
        <div className="w-full">
          <div
            className="w-full h-[189.97px] bg-center bg-cover border-b-8 border-[#EC1D24]"
            style={{ backgroundImage: `url(${`${character.thumbnail.path}.${character.thumbnail.extension}`})` }}
          ></div>
          <div className="flex flex-row items-center gap-2 px-2 py-4 bg-black rounded-br-xl" style={{ height: '60px' }}>
            <div className="flex-grow w-11/12 overflow-auto text-white">
              <p>{character.name}</p>
            </div>
            <div className="flex w-1/12">
              <Image src="/state-selected.png" alt="state selected" className="h-full" width="24" height="21" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
