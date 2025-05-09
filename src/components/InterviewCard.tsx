import { cn, getRandomInterviewCover } from '@/lib/utils'
import { IconCalendarWeek, IconCarambola } from '@tabler/icons-react'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import DisplayTechIcons from './DisplayTechIcons'
import { Button } from './ui/button'

const InterviewCard = ({
  interviewId,
  // userId,
  role,
  type,
  techstack,
  createdAt
}: InterviewCardProps) => {
  const feedback = null as Feedback | null

  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type

  const badgeColor =
    {
      Behavioral: 'bg-light-400',
      Mixed: 'bg-light-600',
      Technical: 'bg-light-800'
    }[normalizedType] || 'bg-light-600'

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format('MMMM D, YYYY')

  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
      <div className='card-interview'>
        <div>
          <div
            className={cn(
              'absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg',
              badgeColor
            )}
          >
            <p className='badge-text text-white'>{normalizedType}</p>
          </div>

          <Image
            src={getRandomInterviewCover()}
            alt='cover-image'
            width={70}
            height={70}
            className='rounded-full object-fit size-[70px]'
          />

          <h3 className='mt-5 capitalize'>{role} Interview</h3>

          <div className='flex flex-row gap-5 mt-3'>
            <div className='flex flex-row gap-2 items-center'>
              <IconCalendarWeek
                className='text-yellow-500 dark:text-yellow-100'
                size={20}
              />

              <p className='text-gray-500 dark:text-gray-400'>
                {formattedDate}
              </p>
            </div>

            <div className='flex flex-row gap-2 items-center'>
              <IconCarambola
                className='text-yellow-500 dark:text-yellow-100'
                size={20}
              />

              <p className='text-gray-500 dark:text-gray-400'>
                {feedback?.totalScore || '---'}/100
              </p>
            </div>
          </div>

          <p className='line-clamp-2 mt-5 text-gray-500 dark:text-gray-400'>
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className='flex flex-row  justify-between'>
          <DisplayTechIcons techStack={techstack} />

          <Button>
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? 'Check Feedback' : 'View Interview'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default InterviewCard
