import React from "react";

const PulseLoader = () => {
  return (
    <div className="relative flex justify-center items-center">
      <span className="absolute w-10 h-10 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
      <span className="absolute w-6 h-6 rounded-full bg-blue-600 opacity-75 animate-ping [animation-delay:200ms]"></span>
      <span className="absolute w-3 h-3 rounded-full bg-blue-700"></span>
    </div>
  );
};

export default PulseLoader;
