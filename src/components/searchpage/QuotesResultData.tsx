/* eslint-disable @next/next/no-img-element */
import DOMPurify from "dompurify";
import Meta from "@/components/global/Meta";
import { useLocale } from "next-intl";

interface QuoteData {
  img?: string;
  text: string;
  mobile?: boolean;
  likes?: string;
}

interface QuotesResultDataProps {
  scrapedData: {
    quotes: QuoteData[];
  };
  query: string;
}

const QuotesResultData: React.FC<QuotesResultDataProps> = ({ scrapedData, query }) => {
  const lang = useLocale(); 
  return (
    <div
      id="quotesSearchResults"
      className="flex flex-col justify-center items-center"
    >
      <Meta
        title={
          query
            ? query
                .replace("https://www.goodreads.com/search?q=", "")
                .toUpperCase()
            : " "
        }
      />
      {scrapedData.quotes.map((data, i) => (
        <div
          id="resultCard"
          key={i}
          className="max-w-7xl mx-2 sm:mx-4 my-4 py-4 px-2 sm:px-8 bg-white/40 dark:bg-slate-800/60 rounded-2xl hover:ring hover:ring-rose-600 hover:bg-rose-300 dark:hover:bg-rose-900 transition duration-300 delay-40 hover:delay-40"
        >
          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-between">
              {data.img && (
                <div className="hidden w-[240px] lg:block overflow-hidden hover:rounded-xl ml-10 px-4">
                  
                </div>
              )}
              <div className="mt-8 space-y-8">
                <div
                  className={`flex flex-col items-start ml-4 md:ml-6 text-gray-800 dark:text-gray-300 ${
                    data.mobile ? "max-w-4xl" : "max-w-none"
                  } text-left`}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        data.text
                          .replaceAll("https://www.goodreads.com", "")
                          .replaceAll("/author/quotes", "/"+lang+"/author/show")
                          .replaceAll(
                            "<a",
                            '<a class="underline hover:decoration-red-600"'
                          )
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
            {data.likes && (
              <div
                id="review-likes"
                className="flex align-middle items-center mt-4"
              >
                <div className="ml-6 mt-1">
                  
                </div>
                <div>
                  <p className="ml-1 text-slate-800 dark:text-gray-100">
                    {data.likes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuotesResultData;
