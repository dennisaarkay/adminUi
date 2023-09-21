import React from "react";

const SearchBar = ({ search , handleSearchInput})=>(
    <input
    className="search"
    type="text"
    placeholder="Search by name, email, ot role..."
    value={search}
    onChange={handleSearchInput}/>
);

export default SearchBar;