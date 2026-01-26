import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'

// Fix: Ensure the font is properly configured and exported
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',  // Add this for better CSS variable usage
  display: 'swap'  // Improves performance
})

export const metadata: Metadata = {
  title: 'Vouch - Get work experience without a job',
  description: 'Complete real-world projects to earn verified proof of skill that replaces your resume.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>  {/* Use variable instead of className */}
      <body className="font-sans">  {/* Use a generic class that will be overridden by the variable */}
        <Header />
        {children}
      </body>
    </html>
  )
}