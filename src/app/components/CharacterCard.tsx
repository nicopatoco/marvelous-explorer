import Image from 'next/image'
import Link from 'next/link'
import { Character } from '../types/character'
import { AppDispatch, RootState } from '../state/store'
import { useDispatch, useSelector } from 'react-redux'
import { addFavourite, removeFavourite } from '../state/charactersSlice'

export default function CharacterCard({ character }: { character: Character }) {
  const favourites = useSelector((state: RootState) => state.characters.favourites)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="flex flex-col" style={{ width: '172.5px', minHeight: '245.97px' }}>
      <div className="flex flex-col">
        <div className="w-full">
          <Link
            href={`/details/${character.id}`}
            passHref
            aria-label={`Details about ${character.name}`}
            data-testid="character-link"
          >
            <div
              className="w-full h-[189.97px] bg-center bg-cover border-b-8 border-[#EC1D24]"
              style={{ backgroundImage: `url(${`${character.thumbnail.path}.${character.thumbnail.extension}`})` }}
            ></div>
          </Link>
          <div className="flex flex-row items-center gap-2 px-2 py-4 bg-black rounded-br-xl" style={{ height: '60px' }}>
            <div className="flex-grow w-11/12 overflow-auto text-white">
              <p>{character.name}</p>
            </div>
            <button
              aria-label={
                favourites.includes(character.id.toString())
                  ? `Remove ${character.name} from favorites`
                  : `Add ${character.name} to favorites`
              }
              onClick={() =>
                dispatch(
                  favourites.includes(character.id.toString())
                    ? removeFavourite(character.id.toString())
                    : addFavourite(character.id.toString())
                )
              }
              className="flex w-1/12 justify-center items-center"
            >
              <span className="sr-only">
                {favourites.includes(character.id.toString()) ? `Remove from favorites` : `Add to favorites`}
              </span>
              <Image
                src={favourites.includes(character.id.toString()) ? '/state-selected.png' : '/state-unselected.png'}
                alt="" // Image is now purely decorative because the button provides the context
                width="24"
                height="21"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
