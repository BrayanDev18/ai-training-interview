'use client'

import { ProgressProvider } from '@bprogress/next/app'
import React from 'react'

const NProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressProvider
        height='4px'
        color='rgba(120,119,198,0.5)'
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
    </>
  )
}

export default NProgressProvider
