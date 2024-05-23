import React, { createContext, useState, useEffect } from 'react';

const Context = createContext();
// Le Context va permettre de rendre disponibles tous les states initialisés ici à tous les composants enfants
// Pour se faire, dans le fichier index.js on enveloppe le router dans la balise ContextProvider
const ContextProvider = ({ children }) => {

    const [attractions, setAttractions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagSearched, setTagSearched] = useState("");
    const [allPrices, setAllPrices] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/categories");
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPrices = async () => {
        const response = await fetch("http://localhost:3000/api/prices");
        const data = await response.json();
        setAllPrices(data.prices);
    };

    useEffect(() => {
        fetchCategories();
        fetchPrices();
    }, []);

    return (
        <Context.Provider value={{attractions, setAttractions, categories, setCategories, tags, setTags, tagSearched, setTagSearched, allPrices, setAllPrices}}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };