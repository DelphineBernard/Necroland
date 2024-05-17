import React, { createContext, useState } from 'react';

const Context = createContext();
// Le Context va permettre de rendre disponibles tous les states initialisés ici à tous les composants enfants
// Pour se faire, dans le fichier index.js on enveloppe le router dans la balise ContextProvider
const ContextProvider = ({ children }) => {

    const [attractions, setAttractions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagSearched, setTagSearched] = useState("");

    return (
        <Context.Provider value={{attractions, setAttractions, categories, setCategories, tags, setTags, tagSearched, setTagSearched}}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };