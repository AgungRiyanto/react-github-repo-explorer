import React from "react";

const Spinner = ({ text }: { text?: string }) => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <h3 className="ml-4 text-md">{text}</h3>
    </div>
  );
};

export default Spinner;
