import React, { createContext, useState } from 'react'

export const SearchGlobalContext = createContext()

export const SearchGlobalProvider = ({children}) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    return (
        <SearchGlobalContext.Provider value={{
            searchKeyword,
            setSearchKeyword,
            searchResults,
            setSearchResults,
            
        }}>
          {children}
        </SearchGlobalContext.Provider>
      );
}
