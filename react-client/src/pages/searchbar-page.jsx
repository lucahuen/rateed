import React, { useState } from 'react';
import SearchBar from '../components/searchbar';
import { searchCollection } from '../services/api';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const data = await searchCollection(query);
      setResults(data);
    } catch (error) {
      console.error('Fehler bei der Suche:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Suche</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      <div>
        {results.map((item, index) => (
          <div key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default searchbar;