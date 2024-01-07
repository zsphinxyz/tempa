import type { Metadata } from 'next'
import './globals.css'
import ClientProvider from './components/ClientProvider'

export const metadata: Metadata = {
  title: 'Tempa',
  description: 'Temp Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className='max-w-7xl mx-auto'>{children}</body>
      </html>
    </ClientProvider>
  )
}
