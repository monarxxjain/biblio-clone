import React from 'react'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import BlogSection from '@/components/blogsection/BlogSection'
import Meta from '@/components/global/Meta'

// Define the interface for the params object
interface Params {
    slug: string;
    locale: string;
}interface BlogsProps {
    params: Params;
}
const blogs: React.FC<BlogsProps> = ({ params }) => {

    return (
        <div className='bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientpage h-full'>
            <Meta title={'Blogs'} />
            <Header />
            <BlogSection language = {params.locale} />


            <Footer />
        </div>
    )
}

export default blogs