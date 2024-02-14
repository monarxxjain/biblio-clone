import React from 'react'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import BlogSection from '@/components/blogsection/BlogSection'
import Meta from '@/components/global/Meta'

const blogs: React.FC = () => {

    return (
        <div className='bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full'>
            <Meta title={'Blogs'} />
            <Header />
            <BlogSection />


            <Footer />
        </div>
    )
}

export default blogs