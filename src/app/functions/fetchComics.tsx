import axios from 'axios'
import { MarvelComicApiResponse } from '../types/comic'
import { generateMD5 } from './utils'

export async function fetchComicsForCharacterWithOffset(
  characterId: string,
  offset = 0,
  limit = 20,
  orderBy = 'onsaleDate'
) {
  const baseUrl = process.env.BASE_CHARACTER_URL
  const timestamp = new Date().getTime()
  const publicKey = `${process.env.PUBLIC_MARVEL_API_KEY}`
  const privateKey = `${process.env.PRIVATE_MARVEL_API_KEY}`
  // Require by the Api, we need to generate the hash using public and private key
  const hash = generateMD5(timestamp + privateKey + publicKey)

  const apiUrl = `${baseUrl}/${characterId}/comics?&orderBy=${orderBy}&limit=${limit}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}&offset=${offset}`

  try {
    const res: MarvelComicApiResponse = (await axios.get(apiUrl)).data
    return res
  } catch (error) {
    throw error
  }
}
