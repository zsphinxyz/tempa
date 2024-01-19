import type { Metadata } from 'next'
import './globals.css'
import ClientProvider from '../components/ClientProvider'
import Nav from '../components/Nav'
import FirebaseProvider from '../components/FirebaseProvider'
import { ThemeProvider } from '@/components/ThemeProvider'

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
      <html lang="en" suppressHydrationWarning>
        <body className=''>
          <FirebaseProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
                <Nav />
                {children}
            </ThemeProvider>
          </FirebaseProvider>
        </body>
      </html>
    </ClientProvider>
  )
}
