import React from "react";
import "../SearchBar/Search.css";

const Search = () => {
  /**
   * Search Component(Top)
   * --------------
   * This will appear on the top right of the hompepage
   * Will slide to the product list on searching the element
   *
   */

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z" />
        </svg>
      </button>
    </div>
  );
};

export default Search;
