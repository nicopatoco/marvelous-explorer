'use client'
import BannerCharacter from '@/app/components/BannerCharacter'
import ComicCarousel from '@/app/components/ComicCarousel'
import ErrorDisplay from '@/app/components/ErrorDisplay'
import LoadingDisplay from '@/app/components/LoadingDisplay'
import useCharacters from '@/app/hooks/useCharacters'
import useComics from '@/app/hooks/useComics'

export default function Page({ params }: { params: { characterId: string } }) {
  const { comics, loading, error } = useComics(params.characterId)
  const { characters, loading: loadingCharacters, error: errorCharacters } = useCharacters()
  const character = characters.find((c) => c.id.toString() === params?.characterId)

  if (loading || loadingCharacters) {
    return <LoadingDisplay />
  }

  if (error || errorCharacters) {
    if (error) {
      return <ErrorDisplay error={error} />
    }
    if (errorCharacters) {
      return <ErrorDisplay error={errorCharacters} />
    }
  }

  return (
    <>
      {comics.length > 0
        ? character && (
            <>
              <BannerCharacter character={character} />
              <ComicCarousel comics={comics} character={character} />
            </>
          )
        : character && (
            <>
              <BannerCharacter character={character} />
              <div className="p-8 text-4xl">There is no comics</div>
            </>
          )}
    </>
  )
}
