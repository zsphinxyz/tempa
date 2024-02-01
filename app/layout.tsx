import type { Metadata } from 'next'
import './globals.css'
import ClientProvider from '../components/ClientProvider'
import Nav from '../components/Nav'
import FirebaseProvider from '../components/FirebaseProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'

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
        <body className='flex flex-col min-h-[100dvh] justify-between'>
          <FirebaseProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
                <Nav />
                {children}
                <Toaster />
                <footer className="w-full py-1 text-center text-foreground bg-muted-foreground/10 mt-5">
                  &copy;2024 by <a href="https://linktr.ee/zsphinx" className='text-blue-500 underline'>zsphinx</a>
                </footer>
            </ThemeProvider>
          </FirebaseProvider>
        </body>
      </html>
    </ClientProvider>
  )
}
