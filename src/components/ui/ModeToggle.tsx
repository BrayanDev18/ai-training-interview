'use client'

import { IconMoonFilled, IconSunFilled } from '@tabler/icons-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ModeToggle = () => {
  const [mount, setMount] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    setMount(true)
  }, [])

  return mount ? (
    <div className='absolute top-0 w-full flex justify-end items-end p-4'>
      <button
        onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
        type='button'
        className='flex h-10 w-10 items-center justify-center rounded-md bg-primary-100 dark:bg-dark-300 backdrop-blur-md'
      >
        <IconMoonFilled className='dark:hidden text-gray-600' />
        <IconSunFilled className='hidden dark:block text-yellow-400' />
      </button>
    </div>
  ) : null
}

export default ModeToggle
