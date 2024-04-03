import Header from '@/app/components/Header'
import { FavouritesCharactersProvider } from '@/app/context/FavouriteCharactersContext'
import type { AppProps } from 'next/app'
import '../app/globals.css'
import { CharactersProvider } from '@/app/context/CharactersContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <FavouritesCharactersProvider>
        <Header />
        <CharactersProvider>
          <Component {...pageProps} />
        </CharactersProvider>
      </FavouritesCharactersProvider>
    </>
  )
}

export default MyApp
