import ModeToggle from '@/components/ui/ModeToggle'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ModeToggle />

      <div className='root-layout'>
        <nav>
          <Link
            href='/'
            className='flex items-center gap-2 mb-8'
          >
            <Image
              src='/logo.svg'
              width={38}
              height={32}
              alt='logo'
            />
            <h2 className='text-primary-200'>PrepWise</h2>
          </Link>

          {children}
        </nav>
      </div>
    </>
  )
}
