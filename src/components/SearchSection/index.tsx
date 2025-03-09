import React from "react";
import { useState } from "react";

type Props = {
  onSearch: (keyword: string) => void;
};

const SearchSection = (props: Props) => {
  const { onSearch } = props;
  const [keyword, setKeyword] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(keyword);
    }
  };

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="flex flex-col py-4 px-6 gap-y-4">
      <input
        className="border w-full p-2 rounded-md"
        placeholder="Enter username"
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="p-2 bg-[#2c9cdb] rounded-md text-white"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchSection;
