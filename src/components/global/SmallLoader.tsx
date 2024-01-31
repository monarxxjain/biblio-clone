import React, { FC } from "react";
interface SmallLoaderProps {
  height: any;
}

const SmallLoader: FC<SmallLoaderProps> = ({ height }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-[${height}vh]`}
    >
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default SmallLoader;
