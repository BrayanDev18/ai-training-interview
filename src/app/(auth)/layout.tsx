import { isAuthenticated } from '@/lib/actions/auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const isUserAuthenticated = await isAuthenticated()

  if (isUserAuthenticated) redirect('/')

  return (
    <div className='flex items-center h-screen justify-center '>{children}</div>
  )
}
