"use client"
import { useEffect, useState } from "react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import Loader from "@/components/global/Loader";
import ErrorMessage from "@/components/global/ErrorMessage";
import QuotesResultData from "@/components/quotespage/QuotesResultData";

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

const Quotes: React.FC  = () => {
  const [scrapedData, setScrapedData] = useState<ScrapedData|undefined>();
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const res = await fetch(`/api/quotes/home`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        queryURL: `https://www.goodreads.com/quotes`,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setScrapedData(data.respData);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error:unknown) {
      setError(true);
    }
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-tr from-rose-50 to-rose-200 dark:bg-gradientedge text-gray-900 dark:text-gray-100 min-h-screen">
        <Header />
        {/* Show loader or error based on the scraper data response */}
        {error && (
          <ErrorMessage status="500" url={`https://www.goodreads.com/quotes`} />
        )}
        {!error && (
          <>
            {scrapedData?.name === undefined && <Loader other={true} />}
            {scrapedData?.error && (
              <ErrorMessage
                status="404"
                url={`https://www.goodreads.com/quotes`}
              />
            )}
            {scrapedData?.name === "" && (
              <ErrorMessage
                status="ScraperError"
                url={`https://www.goodreads.com/quotes`}
              />
            )}
            {scrapedData && <QuotesResultData scrapedData={scrapedData} />}
          </>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Quotes;
