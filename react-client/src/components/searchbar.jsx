import React from 'react';
import { useTheme } from '@mui/material/styles'; // useTheme Hook importieren

const SearchBar = ({ searchInput, onInputChange, onSearch }) => {
    const theme = useTheme(); // Zugriff auf das aktuelle Theme

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
                onFocus={(e) => e.target.style.borderColor = theme.palette.primary.main} // Setze den Fokusrahmen zur primary Farbe
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
            <button
                onClick={onSearch}
                style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    border: 'none',
                    borderRadius: '0 8px 8px 0',
                    backgroundColor: theme.palette.primary.main, // Verwende die primary Farbe für den Button-Hintergrund
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = theme.palette.primary.dark; // Verwende die dunkle primary Farbe im Hover-Zustand
                    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = theme.palette.primary.main; // Setze die ursprüngliche Farbe zurück
                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                }}
            >
                Suchen
            </button>
        </div>
    );
};

export default SearchBar;