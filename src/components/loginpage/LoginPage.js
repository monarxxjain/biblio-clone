'use client'

import { signIn, useSession } from 'next-auth/react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const session = useSession()
  const lang = useLocale()

  // if (session.status === 'authenticated') {
  //   router.push('/')
  // }
  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/' + lang) 
    }
  }, [session.status, router])
  return (
    <main className='w-full h-screen flex flex-col items-center mt-12 px-6'>
      <div className='w-full space-y-6 text-gray-600 sm:max-w-md bg-white rounded'>
        <div className='text-center'>
          <div className='mt-5 space-y-2'>
            <h3 className='text-gray-800 text-2xl font-bold sm:text-3xl'>
              Log in to your account
            </h3>
            <p className=''>
              Don't have an account?{' '}
              <Link
                href={'/' + lang + '/signup'}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div className='bg-white  p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg'>
          <div className='grid grid-cols-3 gap-x-3'>
            <button
              onClick={() => signIn('google')}
              className='flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100'
            >
              <img src='/login/google.svg' alt='' width='28' height='25' />
            </button>
            <button
              onClick={() => signIn('facebook')}
              className='flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100'
            >
              <img src='/login/facebook.svg' alt='' width='30' height='25' />
            </button>
            <button
              onClick={() => signIn('twitter')}
              className='flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100'
            >
              <img src='/login/twitter.svg' alt='' width='30' height='25' />
            </button>
          </div>
          <div className='relative'>
            <span className='block w-full h-px bg-gray-300'></span>
            <p className='inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto'>
              Or continue with
            </p>
          </div>
          <form onSubmit={e => e.preventDefault()} className='space-y-5'>
            <div>
              <label className='font-medium'>Email</label>
              <input
                onChange={e => setEmail(e.target.value)}
                type='email'
                required
                className='w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
              />
            </div>
            <div>
              <label className='font-medium'>Password</label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                onChange={e => setPassword(e.target.value)}
                required
                className='w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
              />
            </div>
            <button
              className='w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150'
              onClick={() =>
              
                signIn('credentials', {
                  email,
                  password,
                  redirect: true,
                  callbackUrl: '/' + lang
                }).then((resp)=>{
                  console.log("Resp ",resp);
                })
              }
              disabled={!email || !password}
            >
              Sign in
            </button>
          </form>
          <div className='text-center bg-white '>
            <div
              onClick={() => router.push('/forgotpassword')}
              href='#!'
              className=' hover:text-indigo-800 text-indigo-500 text-0.1rem  sm:text-0.1 rem'
            >
              Forgot password?
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
