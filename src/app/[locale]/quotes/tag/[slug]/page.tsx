"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'
import Loader from '@/components/global/Loader'
import ErrorMessage from '@/components/global/ErrorMessage'
import QuotesResultData from '@/components/quotespage/QuotesResultData'


interface Params {
  slug: string;
}
interface Data {
  name: string;
  url: string;
}

interface Quote {
  img?: string;
  imgURL: string;
  imgAlt?: string;
  text: string;
  author: string;
  bookURL?: string;
  book: string;
  mobile?: boolean;
  likes?: number;
}

interface ScrapedData {
  name: string;
  quotes: Quote[];
  image: string;
  scrapeURL:any;
  popularTags: Data[];
  error?: boolean;
}



const Slug = ({params}: {params: Params}) => {
  const router = useRouter()
  const  slug = params.slug
  const [scrapedData, setScrapedData] = useState<ScrapedData|undefined>()
  const [error, setError] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/quotes/slug`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            queryURL: `https://www.goodreads.com/quotes/tag/${slug}`
          }),
          signal: abortController.signal
        })
        if (res.ok) {
          const data = await res.json()
          setScrapedData(data.respData)
        } else {
          setError(true)
        }
      } catch (err:any) {
        if (err.name === 'AbortError') {
          return
        }
        setError(true)
      }
    }

    if (slug) {
      fetchData()
    }

    return () => {
      abortController.abort()
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
            url={`https://www.goodreads.com/quotes/tag/${slug}`}
          />
        )}
        {!error && (
          <>
            {scrapedData?.name === undefined && <Loader other={true} />}
            {scrapedData?.error && (
              <ErrorMessage
                status='404'
                url={`https://www.goodreads.com/quotes/tag/${slug}`}
              />
            )}
            {scrapedData?.quotes && scrapedData.quotes.length === 0 && (
              <ErrorMessage
                status='ScraperError'
                url={`https://www.goodreads.com/quotes/tag/${slug}`}
              />
            )}
            {scrapedData && <QuotesResultData scrapedData={scrapedData} />}
          </>
        )}
        <Footer />
      </div>
    </div>
  )
}

export default Slug
