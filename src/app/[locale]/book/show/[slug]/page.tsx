'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import Loader from '@/components/global/Loader'
import ErrorMessage from '@/components/global/ErrorMessage'
import ResultData from '@/components/resultpage/ResultData'
import { getSession, useSession } from 'next-auth/react'

interface Params {
  slug: string;
  locale: string;
}

interface ScrapedData {
  title: string;
  ratingCount: string;
  reviewsCount: string;
  desc: string;
  bookEdition: string;
  publishDate: string;
  isbn: string;
  lang: string;
  scrapeURL: string;
  reviewBreakdown: any;  
  quotesURL: string;
  questions:any;
  cover:any;
  author:any;
  rating:any;
  seriesURL:any;
  series:any;
  quotes:any;
  questionsURL:any;
  genres:any;
  reviews:any;
  statusCode: number;

}

const Slug = ({params}: {params: Params}) => {
  const router = useRouter()
  const slug  = params.slug;

  const [scrapedData, setScrapedData] = useState<ScrapedData>()
  const [error, setError] = useState(false)
  
  useEffect(() => {

    getSession().then((res)=>{
      if(res?.user?.email)
      {
        sessionStorage.setItem('visitCount','0');
      }else{
        const cnt = parseInt(sessionStorage.getItem('visitCount')||'0');
        console.log("current cnt ",cnt);
        sessionStorage.setItem('visitCount',(cnt+1).toString())
        if(((cnt+1))>=(parseInt(process.env.NEXT_PUBLIC_VISIT_ALLOWED || '10')))
        router.push(`/${params.locale}/login`)
      }
    })
    const fetchData = async () => {
      const res = await fetch(`/api/book-scraper`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/book/show/${slug}`,
          bookId: slug
        })
      })
      if (res.ok) {
        const data = await res.json()
        setScrapedData(data)
        // console.log("ScrapedData ",data)
      } else if (!res.ok) {
        // TODO: come up with a better solution than retrying until a successful response is received
        setTimeout(function () {
          fetchData()
        }, 2000)
      } else {
        setError(true)
      }
    }

    if (slug) {
      fetchData()
    }
  }, [slug])

  return (
    <div>
      <div className='bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen'>
        <Header />
        {/* Show loader or error based on the scraper data response */}
        {error && (
          <ErrorMessage
            status='500'
            url={`https://www.goodreads.com/book/show/${slug}`}
          />
        )}
        {!error && (
          <>
            {scrapedData?.title === undefined && <Loader />}
            {scrapedData?.statusCode === 404 && (
              <ErrorMessage
                status='404'
                url={`https://www.goodreads.com/book/show/${slug}`}
              />
            )}
            {scrapedData?.title === '' && (
              <ErrorMessage
                status='ScraperError'
                url={`https://www.goodreads.com/book/show/${slug}`}
              />
            )}
            {scrapedData && <ResultData scrapedData={scrapedData} slug={slug} language={params.locale} />}
          </>
        )}
        <Footer />
      </div>
    </div>
  )
}

export default Slug
