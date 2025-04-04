'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { auth } from '@/firebase/client'
import { signUp } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required')
})

const SignUp = () => {
  const router = useRouter()

  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { name, email, password } = values

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const result = await signUp({
        uid: userCredentials.user.uid,
        name: name!,
        email,
        password
      })

      if (!result?.success) {
        toast.error(result?.message)
        return
      }

      toast.success('Account created successfully')
      router.push('/sign-in')
    } catch (error) {
      console.log(error)
      toast.error(`There was an error: ${error}`)
    }
  }

  return (
    <div className='shadow-input mx-auto w-full max-w-md light-gradient dark:dark-gradient p-8 rounded-2xl'>
      <div className='my-5 h-[1.5px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />

      <div className='flex  flex-col gap-2'>
        <h2 className='text-[27px] font-bold'>
          Start with{' '}
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
          <Label htmlFor='name'>First name</Label>
          <Input
            id='name'
            placeholder='Tyler'
            type='text'
            name='name'
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

        <Button
          type='submit'
          className='font-semibold w-full mt-6 bg-gradient-to-r from-primary-600  to-primary-400'
        >
          Create and account
          <BottomGradient />
        </Button>
      </form>

      <p className='text-center text-[15px] text-gray-400'>
        Have an account already?
        <Link
          href='/sign-in'
          className='font-bold ml-1 text-gray-300'
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
