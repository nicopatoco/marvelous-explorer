import Image from 'next/image'
import { Character } from '../types/character'

interface Props {
  character: Character
}

export default function BannerCharacter({ character }: Props) {
  return (
    <div className="w-full text-white bg-black rounded-br-xl">
      <div className="flex flex-row">
        <div className="flex w-3/12 min-w-[320px] max-w-[320px]">
          <Image
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={`Character ${character.id}`}
            width={320}
            height={320}
            layout="fixed"
          />
        </div>
        <div className="flex flex-col justify-center w-9/12 pl-16 pr-8">
          <div className="flex flex-row justify-between">
            <div className="mb-8 text-4xl">{character.name}</div>
            <div className="justify-center">
              <div className="flex flex-row items-center gap-2">
                <Image src="/state-selected.png" alt="state selected" width={24} height={21} />
                <div className="text-white">{5}</div>
              </div>
            </div>
          </div>
          <div className="text-base">{character.description}</div>
        </div>
      </div>
    </div>
  )
}
