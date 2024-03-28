'use client'
import { Provider } from 'react-redux'
import { store } from './state/store'
import Header from './components/Header'
import CharactersPage from './(pages)/page'

export default function Home() {
  return (
    <Provider store={store}>
      <Header />
      <main className="bg-white">
        <CharactersPage />
      </main>
    </Provider>
  )
}
