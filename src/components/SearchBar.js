import React from 'react';

function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <div>
            <input 
                type="text"
                placeholder="Search by Course, Day, or Venue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: '8px', width: '60%', margin: '10px 0' }}
            />
        </div>
    );
}

export default SearchBar;