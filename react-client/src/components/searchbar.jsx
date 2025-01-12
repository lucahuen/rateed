import React from 'react';

const SearchBar = ({ searchInput, onInputChange, onSearch }) => {
    return (
        <div style={{ margin: '20px' }}>
            <input
                type="text"
                placeholder="Suche eingeben..."
                value={searchInput}
                onChange={(e) => onInputChange(e.target.value)}
            />
            <button onClick={onSearch}>Suchen</button>
        </div>
    );
};

export default SearchBar;
