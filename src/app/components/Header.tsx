import Link from 'next/link'
import Image from 'next/image'

interface Props {
  items: number
}

export default function Header({ items }: Props) {
  return (
    <div className="absolute w-full bg-black flex flex-row justify-between items-center">
      <Link href={'/'}>
        <Image
          src="/marvel-logo.png"
          alt="marvel logo"
          className="w-full h-full items-start py-4 px-8"
          width="130"
          height="52"
        />
      </Link>
      {items ? (
        <div className="flex flex-row items-center gap-2 px-8">
          <Image
            src="/state-selected.png"
            alt="state selected"
            className="w-full h-full items-start"
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
            className="w-full h-full items-start"
            width="24"
            height="21"
          />
        </div>
      )}
    </div>
  )
}
