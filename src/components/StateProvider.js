import React, { useContext, useReducer, createContext } from "react";

// preparing datat layer
export const StateContext = createContext();

export const StateProvider = ({ reducer, initalState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initalState)}>
      {children}
    </StateContext.Provider>
  );
};

// Hook which allows to pull info frm data layer
export const useStateValue = () => useContext(StateContext);
