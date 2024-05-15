import React, { createContext, useState } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {

    const [attractions, setAttractions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    return (
        <Context.Provider value={{attractions, setAttractions, categories, setCategories, tags, setTags}}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };