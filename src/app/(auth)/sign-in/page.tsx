'use client'

import { Button } from '@/components/ui/button'
import { ButtonGradient } from '@/components/ui/buttonGradient'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { auth } from '@/firebase/client'
import { signIn } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required')
})

const SignIn = () => {
  const router = useRouter()

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values

    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    const idToken = await userCredentials.user.getIdToken()

    await signIn({ email, idToken })

    router.push('/')

    if (!idToken) {
      toast.error('Failed to log in')
      return
    }
  }

  return (
    <div className='shadow-input mx-auto w-full max-w-md light-gradient dark:dark-gradient p-8 rounded-2xl'>
      <div className='my-5 h-[1.5px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />

      <div className='flex  flex-col gap-2'>
        <h2 className='text-[27px] font-bold'>
          Welcome to{' '}
          <span className='bg-gradient-to-r from-primary-400 via-primary-200 to-primary-100 bg-clip-text text-transparent'>
            PrepWise
          </span>
        </h2>

        <p className='text-[15px] text-gray-400'>
          Take your interview to the next level with AI-powered questions and
          answers.
        </p>
      </div>

      <div className='my-5 h-[1.5px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />

      <form
        className='my-6 mt-8'
        onSubmit={handleSubmit(onSubmit)}
      >
        <LabelInputContainer className='mb-5'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            name='email'
            id='email'
            control={control}
            placeholder='projectmayhem@fc.com'
            type='email'
          />
        </LabelInputContainer>

        <LabelInputContainer className='mb-5'>
          <Label htmlFor='password'>Password</Label>
          <Input
            name='password'
            id='password'
            control={control}
            placeholder='••••••••'
            type='password'
          />
        </LabelInputContainer>

        <Button
          type='submit'
          className='font-semibold w-full mt-6 bg-gradient-to-r from-primary-600  to-primary-400'
        >
          Log in
          <ButtonGradient />
        </Button>
      </form>

      <p className='text-center text-[15px] text-gray-400'>
        No account yet?
        <Link
          href='/sign-up'
          className='font-bold ml-1 text-gray-300'
        >
          Sign up
        </Link>
      </p>
    </div>
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

export default SignIn
