import React from 'react'
import Meta from '@/components/global/Meta'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import LoginPage from '@/components/loginpage/LoginPage'

const Login: React.FC = () => {
  return (
    <div className='bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full'>
      <Meta title={'Login'} />
      <Header />
    <LoginPage/>
      <Footer />
    </div>
  )
}

export default Login
