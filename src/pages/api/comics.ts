import { generateMD5 } from '@/app/functions/utils'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { offset = '0', limit = '20', orderBy = 'onsaleDate', characterId } = req.query

  const baseUrl = process.env.BASE_CHARACTER_URL
  const timestamp = new Date().getTime()
  const publicKey = `${process.env.PUBLIC_MARVEL_API_KEY}`
  const privateKey = `${process.env.PRIVATE_MARVEL_API_KEY}`
  // Require by the Api, we need to generate the hash using public and private key
  const hash = generateMD5(timestamp + privateKey + publicKey)

  const apiUrl = `${baseUrl}/${characterId}/comics?&orderBy=${orderBy}&limit=${limit}&ts=${timestamp}&apikey=${publicKey}&hash=${hash}&offset=${offset}`

  try {
    const response = await axios.get(apiUrl)
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data from Marvel API' })
  }
}
