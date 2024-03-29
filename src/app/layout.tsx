'use client'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import Header from './components/Header'
import './globals.css'
import { store } from './state/store'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}
