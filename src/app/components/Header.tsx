import Link from 'next/link'
import Image from 'next/image'

interface Props {
  items: number
}

export default function Header({ items }: Props) {
  return (
    <div className="absolute flex flex-row items-center justify-between w-full bg-black">
      <Link href={'/'}>
        <Image
          src="/marvel-logo.png"
          alt="marvel logo"
          className="items-start w-full h-full px-8 py-4"
          width="130"
          height="52"
          priority={true}
        />
      </Link>
      {items ? (
        <div className="flex flex-row items-center gap-2 px-8">
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
        <div className="flex flex-row items-center gap-2 px-8">
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
  )
}
