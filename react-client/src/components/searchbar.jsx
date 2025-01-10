import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <input
        type="text"
        placeholder="Suche eingeben..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Suchen</button>
    </div>
  );
};

export default SearchBar;