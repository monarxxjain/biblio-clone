import React from 'react'
import Meta from '@/components/global/Meta'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import ForgotPasswordPage from '@/components/forgotpasswordpage/ForgotPasswordPage'

const Forgotpassword: React.FC = () => {
  return (
    <div className='bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full'>
      <Meta title={'Login'} />
      <Header />
    <ForgotPasswordPage/>
      <Footer />
    </div>
  )
}

export default Forgotpassword
