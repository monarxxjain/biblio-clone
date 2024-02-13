"use client";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ReviewCard from "./ReviewCard";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";
import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import ReadMore from "./ReadMore";
import { useLocale } from "next-intl";
import Toast from "../global/Toast";

interface ResultDataProps {
  bookId: string;
  title: string;
  author: string;
}
interface BookData {
  summaries: {
    language: string;
    summary: string;
  }[];
}

const Summary: React.FC<ResultDataProps> = ({ bookId, title, author }) => {
  const [bookData, setBookData] = useState<BookData | undefined>();
  const [curSummary, setCurSummary] = useState<string>("");
  const [showToast,setShowToast] = useState<string>("")
  const curLang = useLocale();
  const fetchBook = async () => {
    const query = groq`*[_type == 'book' && id == $bookId][0]`;
    // console.log(query);
    client
      .fetch(query, { bookId, curLang })
      .then((bookData) => {
        // console.log("book data ", bookData);
        setBookData(bookData ? bookData : { summaries: [] });
      })
      .catch((e) => {
        if (!bookData) setBookData({ summaries: [] });
        console.error("Error fetching book data:", e);
      });
  };

  useEffect(() => {
    console.log("book id ", bookId);
    fetchBook();
    console.log("Finished");
  }, [bookId]);

  useEffect(() => {
    // setCurSummary((bookData?.summaries.filter((data)=>data.language==curLang)?.length)?bookData?.summaries.filter((data)=>data.language==curLang)[0].summary:"");
    setCurSummary(
      bookData?.summaries.length ? bookData?.summaries[0].summary : ""
    );
  }, [bookData]);

  const [createSummaryBtn,setCreateSummaryBtn] = useState<String>("Create a new Summary")
  return (
    bookData && (
      <>
        <div id="libraryToast">
                {showToast && <Toast message={showToast} />}
        </div>
        <div id="bookSummary" className="dark:text-gray-100/80">
          <h2 className="font-bold text-2xl mt-0 mb-4 underline decoration-rose-600">
            Summary:
          </h2>
          <div className="flex space-x-5">
            {
              // bookData.summaries.filter((data)=>data.language==curLang)
              bookData.summaries.map((data, i) => (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setCurSummary(data.summary);
                    }}
                    className="flex items-center py-5 px-16 mt-6 mb-8 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
                  >
                    Version {i + 1}
                  </button>
                </>
              ))
            }
            <button
              type="button"
              onClick={async () => {
                setCreateSummaryBtn("Creating...")
                const res = await fetch(`/api/summary`, {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    bookId: bookId,
                    title: title,
                    lang: curLang,
                    author: author,
                  }),
                });
                
                const data = await res.json();
                // console.log("Chat Gpt Data ", data);
                if (res.ok) {
                  setShowToast("Summary created successfuly.");
                  setTimeout(() => setShowToast(""), 3000);
                  setBookData({
                    ...bookData,
                    summaries: [
                      ...bookData.summaries,
                      { language: curLang, summary: data.respData.summary },
                    ],
                  });
                } else if (!res.ok) {
                  setShowToast("Summary creation failed.");
                  setTimeout(() => setShowToast(""), 3000);
                  console.log("Some thing went wrong while generating summary");
                } else {
                  // setError(true)
                }
                setCreateSummaryBtn("Create a new Summary")
              }}
              className="flex items-center py-5 px-16 mt-6 mb-8 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
            >
              {createSummaryBtn+"sdfds  "}
            </button>
          </div>
          {curSummary && (
            <div>
              <ReadMore>{curSummary}</ReadMore>
            </div>
          )}
        </div>
      </>
    )
  );
};

export default Summary;
