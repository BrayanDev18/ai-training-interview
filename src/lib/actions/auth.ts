'use server'

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const COOKIE_TIME = 60 * 60 * 24 * 7 * 1000

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get()
    if (userRecord.exists) {
      return {
        success: false,
        message: 'This user already exists. Please sign in instead.',
      }
    }

    await db.collection('users').doc(uid).set({
      name,
      email,
    })

    return {
      success: true,
      message: 'Account created successfully. Please sign in.',
    }
  } catch (e: any) {
    console.log('Error creating a user', e);

    if (e.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'This email is already in use',
      }
    }

    return {
      success: false,
      message: 'Failed to create a account',
    }
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email)

    if (!userRecord) {
      return {
        success: false,
        message: 'User does not exist, Create an account',
      }
    }

    await setSessionCookie(idToken)



  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: 'Failed to sign in',
    }
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies()

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: COOKIE_TIME,
  })

  cookieStore.set('session', sessionCookie, {
    maxAge: COOKIE_TIME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })


}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()

  const sessionStore = cookieStore.get('session')?.value

  if (!sessionStore) return null

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionStore, true)

    const userRecord = await db.collection('users').doc(decodedClaims.uid).get()

    if (!userRecord.exists) return null

    return {
      id: userRecord.id,
      ...userRecord.data(),
    } as User

  } catch (error) {
    console.log(error);

    return null
  }

}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()

  return !!user
}