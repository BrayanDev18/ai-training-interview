import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <section className='flex flex-row light-gradient dark:dark-gradient rounded-3xl px-16 py-6 items-center justify-between max-sm:px-4'>
        <div className='flex flex-col gap-5 max-w-lg'>
          <h2 className=''>
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>

          <p className='text-[16px] text-gray-500 dark:text-gray-400'>
            Practice on real interview questions & get instant feedback
          </p>

          <Button
            type='submit'
            asChild
            className='max-sm:w-full w-fit'
          >
            <Link href='/interview'>Start and Interview</Link>
          </Button>
        </div>

        <Image
          src='/robot.png'
          width={400}
          height={400}
          className='max-sm:hidden'
          alt='robot'
        />
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>

        <div className='interviews-section'>
          {/* <p>You haven´t taken any interviews yet</p> */}
          {dummyInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              // userId={user?.id}
              interviewId={interview.id}
              role={interview.role}
              type={interview.type}
              techstack={interview.techstack}
              createdAt={interview.createdAt}
            />
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>

        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              // userId={user?.id}
              interviewId={interview.id}
              role={interview.role}
              type={interview.type}
              techstack={interview.techstack}
              createdAt={interview.createdAt}
            />
          ))}
          {/* <p>There are no interviews available</p> */}
        </div>
      </section>
    </>
  )
}

export default Home
