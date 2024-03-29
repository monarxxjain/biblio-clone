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
  title?: string;
}


const Slug = ({params}: {params: Params}) => {
  const router = useRouter()
  const slug  = params.slug
  console.log(slug)
  const [scrapedData, setScrapedData] = useState<ScrapedData|undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/quotes/home`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/quotes/${slug}`
        })
      })
      if (res.ok) {
        const data = await res.json()
        setScrapedData(data.respData)
      } else {
        setError(true)
      }
    }

    const fetchTagData = async () => {
      setIsLoading(true)
      const res = await fetch(`/api/quotes/slug`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          queryURL: `https://www.goodreads.com/quotes${`/tag?id=${slug}`}`
        })
      })
      if (res.ok) {
        const data = await res.json()
        setScrapedData(data.respData)
        setIsLoading(false)
      } else {
        setError(true)
      }
    }
    if (slug) {
      fetchData() 
    }
    else{
      fetchTagData()
    }
  }, [slug])

  return (
    <div>
      <div className='bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen'>
        <Header />
        {/* Show loader or error based on the scraper data response */}
        {isLoading && <Loader other={true} />}
        {error && (
          <ErrorMessage
            status='500'
            url={`https://www.goodreads.com/quotes/${slug}`}
          />
        )}
        {!error && (
          <>
            {scrapedData?.name === undefined && <Loader other={true} />}
            {scrapedData?.error && (
              <ErrorMessage
                status='404'
                url={`https://www.goodreads.com/quotes/${slug}`}
              />
            )}
            {scrapedData?.quotes && scrapedData?.quotes.length === 0 && (
              <ErrorMessage
                status='ScraperError'
                url={`https://www.goodreads.com/quotes/${slug}`}
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
