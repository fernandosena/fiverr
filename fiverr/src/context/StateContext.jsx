import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const useStateProvider = () => useContext(StateContext);
