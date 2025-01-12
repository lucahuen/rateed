import React from 'react';

const SearchBar = ({ searchInput, onInputChange, onSearch }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0',
        }}>
            <input
                type="text"
                placeholder="Suche eingeben..."
                value={searchInput}
                onChange={(e) => onInputChange(e.target.value)}
                style={{
                    width: '300px',
                    padding: '10px 15px',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px 0 0 8px',
                    outline: 'none',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#007BFF'}
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
            <button
                onClick={onSearch}
                style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    border: 'none',
                    borderRadius: '0 8px 8px 0',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0056b3';
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#007BFF';
                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
            >
                Suchen
            </button>
        </div>
    );
};

export default SearchBar;
