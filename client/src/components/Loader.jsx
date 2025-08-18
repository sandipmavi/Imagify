import React from "react";

const Loader = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
    </div>
  );
};

export default Loader;
