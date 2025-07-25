import React, { createContext } from 'react';

export const MyContext = createContext(null);

export const MyContextProvider = ({ children }) => {
  const value = { basename: '/' }; // Example context value
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
