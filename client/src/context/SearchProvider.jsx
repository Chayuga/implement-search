import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const StateContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = React.useState(0);
  return (
    <StateContext.Provider value={{ query, setQuery, page, setPage }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired
};
