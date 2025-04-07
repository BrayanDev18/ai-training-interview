import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

enum CallStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  CONNECTING = 'CONNECTING',
  FINISHED = 'FINISHED'
}

const Agent = ({ userName }: AgentProps) => {
  const isSpeaking = true
  const callStatus = CallStatus.INACTIVE
  const messages = [
    'What´s your namne?',
    'My name is Jhon Doe, nice too meet you'
  ]

  const lastMessage = messages.at(1)

  return (
    <>
      <div className='call-view'>
        <div className='card-interviewer'>
          <div className='avatar'>
            <Image
              src='/ai-avatar.png'
              width={64}
              height={54}
              alt='vapi'
              className='object-cover'
            />
            {isSpeaking ? <span className='animate-speak' /> : null}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className='card-border'>
          <div className='card-content'>
            <Image
              src='/user-avatar.png'
              width={540}
              height={540}
              alt='vapi'
              className='object-cover rounded-full size-[120px]'
            />

            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length ? (
        <div className='transcript-border'>
          <div className='transcript'>
            <p
              key={lastMessage}
              className={cn(
                'transition-opacity duration-500 opacity-0',
                'animate-fadeIn opacity-100'
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      ) : null}

      <div className='w-full flex justify-center'>
        {callStatus !== 'ACTIVE' ? (
          <Button className='rounded-full'>
            <span
              className={cn(
                'absolute animate-ping rounded-full opacity-70',
                callStatus !== 'CONNECTING' && 'hidden'
              )}
            />

            <span>
              {callStatus === 'INACTIVE' || callStatus === 'FINISHED'
                ? 'Call'
                : '...'}
            </span>
          </Button>
        ) : (
          <Button
            variant='destructive'
            className='rounded-full'
          >
            End
          </Button>
        )}
      </div>
    </>
  )
}

export default Agent
