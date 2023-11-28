import React, {createContext, Dispatch, SetStateAction, useState} from "react";

interface ICursorContext {

}

type CursorContextState = { attached : boolean}

type CursorContextValue = {
    cursor : CursorContextState,
    setCursor : Dispatch<SetStateAction<CursorContextState>>
}
const defaultCursorContextValue : CursorContextValue = {
    cursor : { attached : false},
    setCursor : (cursor: ICursorContext) => {}
}

export const CursorContext = createContext(defaultCursorContextValue);

interface CursorContextProviderProps {

}

export const CursorContextProvider: React.FC<CursorContextProviderProps> = (props) => {
    const {children} = props;
    const [cursor, setCursor] = useState(defaultCursorContextValue.cursor);

    const context = {cursor, setCursor};
    return (
        <CursorContext.Provider value={context}>
            {children}
        </CursorContext.Provider>
    )
};

export default CursorContextProvider;
