import {createContext, useReducer} from 'react';

const initState = {
    nickname: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_NICKNAME':
            return{
                ...state,
                nickname: action.payload
            }
    
        default:
            return state;
    }
}

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);

    return(
        <GameContext.Provider value={{
            state, dispatch
        }}>
            { children }
        </GameContext.Provider>
    )
}