import { createContext, useReducer } from 'react';
import reducer from './reducers';
import {initialValue} from './reducers';

export const Context = createContext();

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialValue)
    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )
}