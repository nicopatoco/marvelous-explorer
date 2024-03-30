import Image from 'next/image'
import { Comic } from '../types/comic'

interface Props {
  comics: Comic[]
}

export default function ComicCarousel({ comics }: Props) {
  return (
    <>
      <div className="container px-8">
        <div className="my-8 font-bold">COMICS</div>
        <div className="flex flex-row gap-4 overflow-x-auto">
          {comics &&
            comics.map((comic) => (
              <div key={`comic-${comic.id}`} className="flex flex-col items-center min-w-[179.2px] max-w-[179.2px]">
                <Image
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={`Comic ${comic.id}`}
                  width={179.2}
                  height={268.8}
                />
                <div className="mt-2 text-sm text-left">{comic.title}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
