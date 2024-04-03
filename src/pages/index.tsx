import CharacterDisplay from '@/app/components/CharacterDisplay'
import ErrorDisplay from '@/app/components/ErrorDisplay'
import LoadingDisplay from '@/app/components/LoadingDisplay'
import { useCharacters } from '@/app/context/CharactersContext'
import { generateMD5 } from '@/app/functions/utils'
import { Character } from '@/app/types/character'
import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useEffect, useMemo, useState } from 'react'

type Repo = {
  characters: Character[] | undefined
  error: string | null
}

export const getServerSideProps: GetServerSideProps<Repo> = async (context) => {
  const offset = context.query.offset || '0'
  const limit = context.query.limit || '100'
  const orderBy = context.query.orderBy || 'name'

  const baseUrl = process.env.BASE_CHARACTER_URL
  const timestamp = new Date().getTime()
  const publicKey = process.env.PUBLIC_MARVEL_API_KEY
  const privateKey = process.env.PRIVATE_MARVEL_API_KEY
  const hash = generateMD5(`${timestamp}${privateKey}${publicKey}`)
  // Require by the Api, we need to generate the hash using public and private key
  const apiUrl = `${baseUrl}?orderBy=${orderBy}&limit=${limit}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}&offset=${offset}`

  try {
    const response = (await axios.get(apiUrl)).data
    const characters: Character[] = response.data.results
    return {
      props: {
        // Only for show characters with images
        characters: characters
          .filter((c) => !c.thumbnail.path.toLowerCase().includes('image_not_available'))
          .slice(0, 50),
        error: null,
      },
    }
  } catch (error) {
    console.error(error)
    return { props: { characters: undefined, error: 'Failed to fetch characters' } }
  }
}

export default function Page({ characters, error }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { setCharacters } = useCharacters()
  const [filter, setFilter] = useState<string | undefined>(undefined)

  const filteredCharacters = useMemo(() => {
    if (filter) {
      return characters
        ? characters.filter((character) => character.name.toLowerCase().includes(filter.toLowerCase()))
        : []
    }
    return characters ?? []
  }, [characters, filter])

  useEffect(() => {
    if (characters) {
      setCharacters(characters)
    }
  }, [characters, setCharacters])

  if (!characters) {
    return <LoadingDisplay />
  }

  if (error) {
    return <ErrorDisplay error={error} />
  }

  return <CharacterDisplay characters={filteredCharacters} setFilter={setFilter} />
}
