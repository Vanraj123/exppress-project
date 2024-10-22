import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-bar-admin">
            <input
                type="text"
                placeholder="Search ..."
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchBar;
