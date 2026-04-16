import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search...', onClear }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      {value && (
        <button onClick={onClear} className="clear-button">
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;