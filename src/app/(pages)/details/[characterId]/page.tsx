'use client'
import BannerCharacter from '@/app/components/BannerCharacter'
import ComicCarousel from '@/app/components/ComicCarousel'
import ErrorDisplay from '@/app/components/ErrorDisplay'
import LoadingDisplay from '@/app/components/LoadingDisplay'
import useCharacters from '@/app/hooks/useCharacters'
import useComics from '@/app/hooks/useComics'

export default function Page({ params }: { params: { characterId: string } }) {
  const { comics, loading: loadingComics, error: errorComics } = useComics(params.characterId)
  const { characters, loading: loadingCharacters, error: errorCharacters } = useCharacters()
  const character = characters.find((c) => c.id.toString() === params?.characterId)

  if (loadingComics || loadingCharacters) {
    return <LoadingDisplay />
  }

  const error = errorComics || errorCharacters
  if (error) {
    return <ErrorDisplay error={error} />
  }

  if (!character) {
    return <div className="p-8 text-4xl">Character not found.</div>
  }

  return (
    <>
      <BannerCharacter character={character} />
      {comics.length > 0 ? (
        <div className="pb-4">
          <ComicCarousel comics={comics} title="COMICS" />
        </div>
      ) : (
        <div className="p-8 text-4xl">There are no comics.</div>
      )}
    </>
  )
}
