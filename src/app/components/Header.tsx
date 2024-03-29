import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const items = 5
  return (
    <div className="pb-[58px]">
      <div className="fixed top-0 left-0 z-50 flex flex-row items-center justify-between w-full px-8 py-4 bg-black">
        <Link href={'/'}>
          <Image
            src="/marvel-logo.png"
            alt="marvel logo"
            className="items-start w-full h-full"
            width="130"
            height="52"
            priority={true}
          />
        </Link>
        {items ? (
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/state-selected.png"
              alt="state selected"
              className="items-start w-full h-full"
              width="24"
              height="21"
            />
            <div className="text-white">{items}</div>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/state-unselected.png"
              alt="state unselected"
              className="items-start w-full h-full"
              width="24"
              height="21"
            />
          </div>
        )}
      </div>
    </div>
  )
}
