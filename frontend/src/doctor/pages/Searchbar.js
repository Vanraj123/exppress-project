import React from 'react';

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="search-bar_doc">
      <input
        type="text"
        id="searchInput"
        placeholder="Search doctors..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
