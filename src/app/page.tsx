'use client'
import { useState } from 'react'
import Header from './components/Header'

export default function Home() {
  const [items, setItems] = useState<number>(0)
  return (
    <main>
      <Header items={items} />
    </main>
  )
}
