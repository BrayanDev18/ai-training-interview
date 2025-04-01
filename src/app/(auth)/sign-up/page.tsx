'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required')
})

const SignUp = () => {
  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log('values: ', values)

      toast.success('Account created successfully')
    } catch (error) {
      console.log(error)
      toast.error(`There was an error: ${error}`)
    }
  }

  return (
    <div className='shadow-input mx-auto w-full max-w-md bg-dark-300 backdrop-blur-xl p-8 rounded-2xl'>
      <div className='flex flex-col gap-6 py-4 justify-center items-center'>
        <div className='flex flex-row gap-2 justify-center'>
          <Image
            src='/logo.svg'
            width={38}
            height={32}
            alt='logo'
          />

          <h2 className='text-primary-100'>PrepWise</h2>
        </div>

        <div className='flex flex-col justify-center items-center gap-2'>
          <h3 className='text-xl font-bold text-light-100'>
            Practice job interview with AI
          </h3>

          <p className='text-sm text-neutral-600 dark:text-neutral-300 text-center'>
            Take your interview to the next level with AI-powered questions and
            answers.
          </p>
        </div>
      </div>

      <form
        className='my-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <LabelInputContainer className='mb-5'>
          <Label htmlFor='fullName'>First name</Label>
          <Input
            id='fullName'
            placeholder='Tyler'
            type='text'
            name='fullName'
            control={control}
          />
        </LabelInputContainer>

        <LabelInputContainer className='mb-5'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            id='email'
            type='email'
            name='email'
            placeholder='projectmayhem@fc.com'
            control={control}
          />
        </LabelInputContainer>

        <LabelInputContainer className='mb-5'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            placeholder='••••••••'
            type='password'
            name='password'
            control={control}
          />
        </LabelInputContainer>

        <div className='my-5 h-[1.5px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />

        <Button
          type='submit'
          className='text-gray-800 font-semibold'
        >
          Create and account
          <BottomGradient />
        </Button>
      </form>

      <p className='text-center text-[15px]'>
        Have an account already?
        <Link
          href='/sign-in'
          className='font-bold ml-1'
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className='absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[rgba(120,119,200,0.6)] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100' />
      <span className='absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[rgba(120,119,200,0.9)] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100' />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  )
}

export default SignUp
