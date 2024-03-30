import axios from 'axios'
import { MarvelApiResponse } from '../types/character'
import { generateMD5 } from './utils'

export async function fetchCharactersWithOffset(offset = 0, limit = 50, orderBy = 'name') {
  const baseUrl = process.env.BASE_CHARACTER_URL
  const timestamp = new Date().getTime()
  const publicKey = `${process.env.PUBLIC_MARVEL_API_KEY}`
  const privateKey = `${process.env.PRIVATE_MARVEL_API_KEY}`
  // Require by the Api, we need to generate the hash using public and private key
  const hash = generateMD5(timestamp + privateKey + publicKey)

  const apiUrl = `${baseUrl}?orderBy=${orderBy}&limit=${limit}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}&offset=${offset}`

  try {
    const res: MarvelApiResponse = (await axios.get(apiUrl)).data
    return res
  } catch (error) {
    throw error
  }
}
