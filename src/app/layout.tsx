'use client'
import { Roboto_Condensed } from 'next/font/google'
import { Provider } from 'react-redux'
import Header from './components/Header'
import './globals.css'
import { store } from './state/store'

const roboto_condensed = Roboto_Condensed({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto_condensed.className}>
        <Provider store={store}>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}
