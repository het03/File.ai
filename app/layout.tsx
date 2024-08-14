import {
  ClerkProvider,
} from '@clerk/nextjs'
import { dark, neobrutalism } from '@clerk/themes'

import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "File.ai",
  description: "Chat with pdf",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider 
    appearance={{
      baseTheme: [neobrutalism],
    }}>
      <html lang="en">
        <body className={roboto.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}