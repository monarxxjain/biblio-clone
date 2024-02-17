import React from "react";
interface ReviewBreakdownProps {
  data: {
    scrapeURL: string;
    reviewBreakdown: {
      rating5: string;
      rating4: string;
      rating3: string;
      rating2: string;
      rating1: string;
    };
    ratingCount: string;
  };
}

const ReviewBreakdown: React.FC<ReviewBreakdownProps> = ({ data }) => {
  return (
    <div
      id="reviewBreakdown"
      className="flex flex-col items-center lg:items-start justify-center pr-0 sm:pr-3"
    >
      <h2
        className={
          data.scrapeURL
            ? "font-bold text-2xl my-2 capitalize underline decoration-rose-600"
            : "hidden"
        }
      >
        Reviews Breakdown:{" "}
      </h2>

      <div
        id="starsBreakdownBar"
        className="flex items-center py-1 sm:py-2 xl:py-4"
      >
        <div className="font-semibold mr-3 px-1">5 Stars: </div>
        <div className="w-60 sm:w-[480px] lg:w-[24rem] 2xl:w-[34rem] h-7 rounded bg-white dark:bg-gray-300">
          <div
            style={{
              width: `${Math.round(
                (parseInt(data.reviewBreakdown.rating5.replaceAll(",", "")) /
                parseInt(data.ratingCount.replaceAll(",", ""))) *
                  100
              )}%`,
              backgroundColor: "#9E1239",
              height: "28px",
              borderRadius: "3.5px",
            }}
          ></div>
        </div>
        <div>
          <span style={{ marginLeft: "10px" }}>
            {Math.round(
              (parseInt(data.reviewBreakdown.rating5.replaceAll(",", "")) /
              parseInt(data.ratingCount.replaceAll(",", "")) )*
                100
            )}
            %
          </span>
        </div>
      </div>
      <div
        id="starsBreakdownBar"
        className="flex items-center py-1 sm:py-2 xl:py-4"
      >
        <div className="font-semibold mr-3 px-1">4 Stars: </div>
        <div className="w-60 sm:w-[480px] lg:w-[24rem] 2xl:w-[34rem] h-7 rounded bg-white dark:bg-gray-300">
          <div
            style={{
              width: `${Math.round(
                (parseInt(data.reviewBreakdown.rating4.replaceAll(",", "")) /
                parseInt(data.ratingCount.replaceAll(",", "")) )*
                  100
              )}%`,
              backgroundColor: "#9E1239",
              height: "28px",
              borderRadius: "3.5px",
            }}
          ></div>
        </div>
        <div>
          <span style={{ marginLeft: "10px" }}>
            {Math.round(
              (parseInt(data.reviewBreakdown.rating4.replaceAll(",", "") )/
              parseInt(data.ratingCount.replaceAll(",", ""))) *
                100
            )}
            %
          </span>
        </div>
      </div>
      <div
        id="starsBreakdownBar"
        className="flex items-center py-1 sm:py-2 xl:py-4"
      >
        <div className="font-semibold mr-3 px-1">3 Stars: </div>
        <div className="w-60 sm:w-[480px] lg:w-[24rem] 2xl:w-[34rem] h-7 rounded bg-white dark:bg-gray-300">
          <div
            style={{
              width: `${Math.round(
                (parseInt(data.reviewBreakdown.rating3.replaceAll(",", ""))/
                parseInt(data.ratingCount.replaceAll(",", ""))) *
                  100
              )}%`,
              backgroundColor: "#9E1239",
              height: "28px",
              borderRadius: "3.5px",
            }}
          ></div>
        </div>
        <div>
          <span style={{ marginLeft: "10px" }}>
            {Math.round(
              (parseInt(data.reviewBreakdown.rating3.replaceAll(",", ""))/
              parseInt(data.ratingCount.replaceAll(",", ""))) *
                100
            )}
            %
          </span>
        </div>
      </div>
      <div
        id="starsBreakdownBar"
        className="flex items-center py-1 sm:py-2 xl:py-4"
      >
        <div className="font-semibold mr-3 px-1">2 Stars: </div>
        <div className="w-60 sm:w-[480px] lg:w-[24rem] 2xl:w-[34rem] h-7 rounded bg-white dark:bg-gray-300">
          <div
            style={{
              width: `${Math.round(
                (parseInt(data.reviewBreakdown.rating2.replaceAll(",", "")) /
                parseInt(data.ratingCount.replaceAll(",", "")) )*
                  100
              )}%`,
              backgroundColor: "#9E1239",
              height: "28px",
              borderRadius: "3.5px",
            }}
          ></div>
        </div>
        <div>
          <span
            style={
              Math.round(
                (parseInt(data.reviewBreakdown.rating2.replaceAll(",", "")) /
                parseInt(data.ratingCount.replaceAll(",", "")) )*
                  100
              ) < 10
                ? { marginLeft: "20px" }
                : { marginLeft: "10px" }
            }
          >
            {Math.round(
              (parseInt(data.reviewBreakdown.rating2.replaceAll(",", "")) /
              parseInt(data.ratingCount.replaceAll(",", "")) )*
                100
            )}
            %
          </span>
        </div>
      </div>
      <div
        id="starsBreakdownBar"
        className="flex items-center py-1 sm:py-2 xl:py-4"
      >
        <div className="font-semibold mr-3 px-1 pr-3">1 Star: </div>
        <div className="w-60 sm:w-[480px] lg:w-[24rem] 2xl:w-[34rem] h-7 rounded bg-white dark:bg-gray-300">
          <div
            style={{
              width: `${Math.round(
                (parseInt(data.reviewBreakdown.rating1.replaceAll(",", ""))/
                parseInt(data.ratingCount.replaceAll(",", ""))) *
                  100
              )}%`,
              backgroundColor: "#9E1239",
              height: "28px",
              borderRadius: "3.5px",
            }}
          ></div>
        </div>
        <div>
          <span
            style={
              Math.round(
                (parseInt(data.reviewBreakdown.rating1.replaceAll(",", "")) /
                parseInt(data.ratingCount.replaceAll(",", ""))) *
                  100
              ) < 10
                ? { marginLeft: "20px" }
                : { marginLeft: "10px" }
            }
          >
            {Math.round(
              (parseInt(data.reviewBreakdown.rating1.replaceAll(",", "")) /
              parseInt(data.ratingCount.replaceAll(",", ""))) *
                100
            )}
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReviewBreakdown;
