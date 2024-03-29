'use client'
import ErrorDisplay from '@/app/components/ErrorDisplay'
import Header from '@/app/components/Header'
import LoadingDisplay from '@/app/components/LoadingDisplay'
import useComics from '@/app/hooks/useComics'

export default function Page({ params }: { params: { characterId: string } }) {
  const { comics, loading, error } = useComics(params.characterId)

  if (loading) {
    return <LoadingDisplay />
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  return (
    <>
      <Header />
      {comics.length > 0 && <div>Has comics</div>}
    </>
  )
}
