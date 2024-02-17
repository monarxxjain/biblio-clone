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
import { Audio } from "openai/resources/index.mjs";
import AudioPlayerModal from "./AudioPlayerModal";
import { LoadingBlock } from "sanity";
import LoadingSpinner from "../global/LoadingSpinner";

interface ResultDataProps {
  bookId: string;
  title: string;
  author: any;
  curLang: string;
}
interface BookData {
  summaries: {
    language: string;
    summary: string;
  }[];
}
interface AudioData {
  audios: {
    language: string;
    audio: {url:string,name:string};
  }[];
}

const Summary: React.FC<ResultDataProps> = ({ bookId, title, author, curLang }) => {
  const [bookData, setBookData] = useState<BookData>({summaries:[]});
  const [audioData, setAudioData] = useState<AudioData>({audios:[]});
  const [curAudio, setCurAudio] = useState<{url:string,name:string} | null>(null);
  const [curSummary, setCurSummary] = useState<string>("");
  const [showToast,setShowToast] = useState<string>("")
  const [bookLoading,setBookLoading] = useState<boolean>(false);
  const [audioLoading,setAudioLoading] = useState<boolean>(false);
  
  const fetchBook = async () => {
    // const query = groq`*[_type == 'book' && id == $bookId][0]`;
    setBookLoading(true);
    const query = groq`*[_type == 'book' && id == $bookId] {
      summaries[][language == $curLang]
    }`;
    // console.log(curLang);
    client
    .fetch(query, { bookId, curLang })
    .then((res) => {
      console.log("book data ", res);
      let temp : BookData|undefined = bookData;
      if(res[0])temp.summaries = (res[0].summaries ? res[0].summaries : [] )
      // console.log("book res ", temp);
    setBookData(temp);
    setBookLoading(false);
  })
  .catch((e) => {
    if (!bookData) setBookData({ summaries: [] });
    console.error("Error fetching book data:", e);
    setBookLoading(false);
  });
};

const fetchAudio = async () => {
  // const query = groq`*[_type == 'book' && id == $bookId][0]`;
    setAudioLoading(true);
    const query = groq`*[_type == 'book' && id == $bookId] {
      audios[]{
        language,
        audio { "url": asset -> url, "name": asset -> originalFilename }
      }[language == $curLang]
    }`;
    // console.log(curLang);
    client
    .fetch(query, { bookId, curLang })
    .then((res) => {
      // console.log("audio data ", res[0].audios);
      let temp : AudioData|undefined = audioData;
      if(res[0])temp.audios = (res[0].audios ? res[0].audios : [] )
      // console.log("audio res ", temp);
    setAudioData(temp);
    setAudioLoading(false);
  })
  .catch((e) => {
    if (!audioData) setAudioData({ audios: [] });
    console.error("Error fetching audio data:", e);
    setAudioLoading(false);
  });
};

  useEffect(() => {
    fetchBook();
    fetchAudio();
  }, [bookId]);

  useEffect(() => {
    // setCurSummary((bookData?.summaries.filter((data)=>data.language==curLang)?.length)?bookData?.summaries.filter((data)=>data.language==curLang)[0].summary:"");
    // console.log(" update summaries ",bookData.summaries)
    setCurSummary(
      bookData?.summaries.length ? bookData?.summaries[0].summary : ""
    );
  }, [bookData]);


  const [createSummaryBtn,setCreateSummaryBtn] = useState<String>("Create a new Summary")
  return (
     (
      <>
        <div id="libraryToast">
                {showToast && <Toast message={showToast} />}
        </div>
        <div id="bookSummary" className="dark:text-gray-100/80">
          {/* <button onClick={()=>{fetchBook()}}>test</button> */}
          <h2 className="font-bold text-2xl mt-0 mb-4 underline decoration-rose-600">
            Summary:
          </h2>
          {/* <LoadingBlock/> */}
          <div className="flex space-x-5">
            
            {bookLoading && (<LoadingSpinner/>)}
            {
              // bookData.summaries.filter((data)=>data.language==curLang)              
              bookData?.summaries?.map((data, i) => (
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
              disabled={(createSummaryBtn==="Creating...")?true:false}
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
              {createSummaryBtn}
            </button>
          </div>
          {curSummary && (
            <div>
              <pre className="whitespace-pre-wrap" >
              <ReadMore>
                {`${curSummary}`}
              </ReadMore>
              </pre>
            </div>
          )}
        </div>

       {/* Audio Part */}

        <div id="audioSummary" className="dark:text-gray-100/80">
          
          <h2 className="font-bold text-2xl mt-0 mb-4 underline decoration-rose-600">
           Audio Summary:
          </h2>
          <div className="flex space-x-5">
            {audioLoading && (<LoadingSpinner/>)}
            {
              // bookData.summaries.filter((data)=>data.language==curLang)
              audioData?.audios?.map((data, i) => (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      // play audio file
                      setCurAudio(data.audio)
                    }}
                    className="flex items-center py-5 px-16 mt-6 mb-8 font-semibold text-md text-gray-900 dark:text-gray-300 bg-rose-50 dark:bg-gray-800 rounded-md shadow-sm shadow-rose-800 hover:shadow-xl hover:bg-rose-300 dark:hover:bg-slate-800 transition duration-300 delay-40 hover:delay-40 ring ring-gray-400 dark:ring-gray-500 hover:ring-rose-600 dark:hover:ring-rose-600"
                  >
                    Version {i + 1}
                  </button>
                </>
              ))
            }
            
          </div>
          <AudioPlayerModal audioFile={curAudio?.url || null} onClose={() => setCurAudio(null)} fileName={curAudio?.name || null} />
        </div>
      </>
    )
  );
};

export default Summary;
