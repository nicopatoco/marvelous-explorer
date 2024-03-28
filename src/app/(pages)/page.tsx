'use client'
import { useState } from 'react'
import Header from '../components/Header'
import useCharacters from '../hooks/useCharacters'

export default function App() {
  const [items, setItems] = useState<number>(0)
  const { characters, loading, error } = useCharacters()

  return (
    <main>
      <Header items={items} />
    </main>
  )
}
