"use client";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ReviewCard from "./ReviewCard";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";
import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
import ReadMore from "./ReadMore";
// import { useClient } from "sanity";
// import {client } from "@/snaity"

interface ResultDataProps {
  bookId: string;
}
interface BookData {
  summaries: {
    language: string;
    summary: string;
  }[];
}

const Summary: React.FC<ResultDataProps> = ({ bookId }) => {
    const [bookData, setBookData] = useState<BookData | undefined>();
    const [curSummary, setCurSummary] = useState<string>("");
    const curLang = "en";
    useEffect(() => {
      console.log("book id ",bookId);
        const fetchBook = async () => {
    //   try {
        // const query = groq`*[_type == 'book' && _id == $bookId][0].summaries[?language == $language]`;
        
        const query = groq`*[_type == 'book' && id == $bookId][0]`
        console.log(query);
        const bookData = await 
        client.fetch(query,{bookId,curLang}).then((bookData)=>{
            console.log("book data ", bookData);
            setBookData(bookData);
        }).catch((e)=>
        {
            console.error("Error fetching book data:", e);
        })
    //   } catch (error) {
    //   }
    };
    fetchBook();
    console.log("Finished")
  }, [bookId]);

  useEffect(()=>{
    // setCurSummary((bookData?.summaries.filter((data)=>data.language==curLang)?.length)?bookData?.summaries.filter((data)=>data.language==curLang)[0].summary:"");
    setCurSummary((bookData?.summaries.length)?bookData?.summaries[0].summary:"");
  },[bookData])
  return (
    bookData && (
      <>
        <div id="bookSummary" className="dark:text-gray-100/80">
          <h2 className="font-bold text-2xl mt-0 mb-4 underline decoration-rose-600">
            Summary:
          </h2>
          <div className="flex space-x-5">
            {
            // bookData.summaries.filter((data)=>data.language==curLang)
            bookData.summaries
            .map((data, i) => (
              <>
                <button
                  type="button"
                  onClick={() => {setCurSummary(data.summary)}}
                  className="flex items-center py-5 px-16 mt-6 mb-8 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
                >
                  Version {i+1}
                </button>
              </>
            ))}
            <button
              type="button"
              onClick={() => {}}
              className="flex items-center py-5 px-16 mt-6 mb-8 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
            >
              Create a new Summary
            </button>
          </div>
          <div>

            <ReadMore>

            {curSummary}
            </ReadMore>

            {/* </textarea> */}
          </div>
        </div>
      </>
    )
  );
};

export default Summary;
