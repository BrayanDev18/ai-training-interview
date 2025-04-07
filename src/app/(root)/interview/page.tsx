import Agent from '@/components/Agent'
import React from 'react'

const HomeInterview = () => {
  return (
    <div className='flex flex-col gap-8'>
      <h3 className=''>Interview Generation</h3>
      <Agent
        userName='You'
        userId='user1'
        type='generate'
      />
    </div>
  )
}

export default HomeInterview
