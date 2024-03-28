'use client'
import { Provider } from 'react-redux'
import { store } from './state/store'
import App from './(pages)/page'

export default function Home() {
  return (
    <main>
      <Provider store={store}>
        <App />
      </Provider>
    </main>
  )
}
