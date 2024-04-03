import BannerCharacter from '@/app/components/BannerCharacter'
import ComicCarousel from '@/app/components/ComicCarousel'
import ErrorDisplay from '@/app/components/ErrorDisplay'
import LoadingDisplay from '@/app/components/LoadingDisplay'
import { useCharacters } from '@/app/context/CharactersContext'
import { generateMD5 } from '@/app/functions/utils'
import { Comic } from '@/app/types/comic'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useParams } from 'next/navigation'

type Repo = {
  comics: Comic[] | undefined
  error: string | null
}

export const getServerSideProps: GetServerSideProps<Repo> = async (context) => {
  const characterId = context.params?.characterId
  const offset = '0'
  const limit = '20'
  const orderBy = 'onsaleDate'

  const baseUrl = process.env.BASE_CHARACTER_URL
  const timestamp = new Date().getTime()
  const publicKey = `${process.env.PUBLIC_MARVEL_API_KEY}`
  const privateKey = `${process.env.PRIVATE_MARVEL_API_KEY}`
  const hash = generateMD5(timestamp + privateKey + publicKey)
  // Require by the Api, we need to generate the hash using public and private key
  const apiUrl = `${baseUrl}/${characterId}/comics?orderBy=${orderBy}&limit=${limit}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}&offset=${offset}`

  try {
    const response = (await axios.get(apiUrl)).data
    const comics: Comic[] = response.data.results

    return { props: { comics, error: null } }
  } catch (error) {
    console.error(error)
    return { props: { comics: undefined, error: 'Failed to fetch comics' } }
  }
}

export default function Page({ comics, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { characters } = useCharacters()
  const params = useParams<{ characterId: string }>()
  const character = characters.find((c) => c.id.toString() === params?.characterId)

  if (!comics || !characters) {
    return <LoadingDisplay />
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  return (
    <>
      {character ? <BannerCharacter character={character} /> : <div className="p-8 text-4xl">Character not found.</div>}

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
