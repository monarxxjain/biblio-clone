"use client"
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ReviewCard from "./ReviewCard";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";
import { client } from "../../../sanity/lib/client";
import { groq } from "next-sanity";
// import { useClient } from "sanity";
// import {client } from "@/snaity"

interface ResultDataProps {
    bookId: string;
}
  
const Summary: React.FC<ResultDataProps> = ({ bookId })   => {
    const [book, setBook] = useState(null);

    useEffect(() => {
      const fetchBook = async () => {
          try {
              // Define your GROQ query to fetch the book by its ID
              const query = groq`*[_type == \"book\"]`;
              
              // Fetch data from Sanity using the query
          console.log("sdfdsf")
          const bookData = null;
        //   await client.fetch(query);
        
          console.log("book data ",client.config());
          client.fetch("*").then((res)=>console.log("Result : ",res)).catch((e)=>console.log("err : ",e))
          setBook(bookData);
        } catch (error) {
          console.error('Error fetching book data:', error);
        }
      };
  
      fetchBook();
  
    }, []); 
  return (
    book &&
    <>
      <div id="bookSummary" className="dark:text-gray-100/80">
        <h2 className="font-bold text-2xl mt-0 mb-4 underline decoration-rose-600">
          Summary:
        </h2>
        <button
          type="button"
          onClick={() => {
            
          }}
          className="flex items-center py-5 px-16 mt-6 mb-8 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
        >
          Create a Summary
          
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          
        </button>


            
        </div>
    </>
  );
};

export default Summary;

