import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'

export default function Header() {
  const favourites = useSelector((state: RootState) => state.characters.favourites)

  const favoriteIconAltText = favourites.length > 0 ? 'View favorites' : 'No favorites selected'

  return (
    <div className="pb-[58px]">
      <div className="fixed top-0 left-0 z-50 flex flex-row items-center justify-between w-full px-8 py-4 bg-black">
        <Link href={'/'} data-testid="marvel-logo">
          <Image
            src="/marvel-logo.png"
            alt="Marvel logo"
            className="items-start w-full h-full"
            width="130"
            height="52"
            priority={true}
          />
        </Link>
        <div className="flex flex-row items-center gap-2">
          <Link href={'/favourites'} data-testid="favorites-link">
            <span className="sr-only">{favoriteIconAltText}</span>
            <Image
              src={favourites.length > 0 ? '/state-selected.png' : '/state-unselected.png'}
              alt=""
              className="items-start w-full h-full"
              width="24"
              height="21"
            />
          </Link>
          {favourites.length > 0 && <div className="text-white">{favourites.length}</div>}
        </div>
      </div>
    </div>
  )
}
