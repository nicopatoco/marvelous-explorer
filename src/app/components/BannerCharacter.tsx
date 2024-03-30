import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { addFavourite, removeFavourite } from '../state/charactersSlice'
import { AppDispatch, RootState } from '../state/store'
import { Character } from '../types/character'

interface Props {
  character: Character
}

export default function BannerCharacter({ character }: Props) {
  const favourites = useSelector((state: RootState) => state.characters.favourites)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="w-full text-white bg-black rounded-br-xl sm:pb-8">
      <div className="flex flex-col md:flex-row ">
        <div className="flex w-full md:w-3/12 justify-center md:min-w-[320px] md:max-w-[320px] mb-0">
          <Image
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={`Character ${character.id}`}
            width={320}
            height={320}
            className="w-full md:w-auto"
          />
        </div>
        <div className="flex flex-col justify-center w-full px-8 md:w-9/12 md:pl-16 md:pr-8">
          <div className="flex flex-row justify-between py-4 md:py-8">
            <div className="mt-4 text-2xl text-left md:text-4xl md:mt-8">{character.name}</div>
            <div className="mt-4 md:mt-8">
              {favourites.find((f) => f === character.id.toString()) ? (
                <Image
                  src="/state-selected.png"
                  alt="state selected"
                  width={24}
                  height={21}
                  onClick={() => dispatch(removeFavourite(character.id.toString()))}
                  className=" min-w-[24px] max-w-[21px]"
                />
              ) : (
                <Image
                  src="/state-unselected.png"
                  alt="state unselected"
                  width={24}
                  height={21}
                  onClick={() => dispatch(addFavourite(character.id.toString()))}
                />
              )}
            </div>
          </div>
          <div className="text-base">{character.description}</div>
        </div>
      </div>
    </div>
  )
}
