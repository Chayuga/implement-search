import React, { createContext, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const StateContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = React.useState(0);
  const tableRef = useRef(null);
  return (
    <StateContext.Provider value={{ query, setQuery, page, setPage, tableRef }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired
};
