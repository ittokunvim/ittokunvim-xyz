import './globals.css'
import '@/config/fontawesome'
import type { Metadata } from 'next'

import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'ittoku-tech',
  description: 'Here is ittokunvim portfolio site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const iconSize = 44;

  return (
    <html lang="ja">
      <body>
        <header>
          <Link href="/">
            <Image
              src="/logo.svg"
              width={iconSize}
              height={iconSize}
              alt="site logo"
            />
          </Link>
        </header>
        {children}
      </body>
    </html >
  )
}
