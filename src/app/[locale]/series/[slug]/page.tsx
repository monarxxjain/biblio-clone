"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import Loader from '@/components/global/Loader'
import ErrorMessage from '@/components/global/ErrorMessage'
import SeriesResultData from '@/components/seriespage/SeriesResultData'


interface Params {
  slug: string;
}

interface ScrapedData {
  title: string;
  error?: boolean;
  works: string;
  desc: string;
  books: any[];
  moreBooks?: any;
}


const Slug = ({params}: {params: Params}) => {
  const router = useRouter()
  const slug  = params.slug
  const [scrapedData, setScrapedData] = useState<ScrapedData|undefined>()
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/seriesscraper`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/series/${slug}`
        })
      })
      if (res.ok) {
        const data = await res.json()
        console.log(data.data)
        setScrapedData(data.data)
      } else {
        console.log(res)
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
            url={`https://www.goodreads.com/series/${slug}`}
          />
        )}
        {!error && (
          <>
            {scrapedData?.title === undefined && <Loader other={true} />}
            {scrapedData?.error && (
              <ErrorMessage
                status='404'
                url={`https://www.goodreads.com/series/${slug}`}
              />
            )}
            {scrapedData?.title === '' && (
              <ErrorMessage
                status='ScraperError'
                url={`https://www.goodreads.com/series/${slug}`}
              />
            )}
            {scrapedData && <SeriesResultData scrapedData={scrapedData} />}
          </>
        )}
        <Footer />
      </div>
    </div>
  )
}

export default Slug
