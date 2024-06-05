import React, { createContext, useState, useEffect } from 'react';
import API_URL from '../../config.js';

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [attractions, setAttractions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagSearched, setTagSearched] = useState("");
    const [allPrices, setAllPrices] = useState([]);
    const [category, setCategory] = useState("all"); // New state for category

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/categories`);
            const data = await response.json();
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPrices = async () => {
        const response = await fetch(`${API_URL}/prices`);
        const data = await response.json();
        setAllPrices(data.prices);
    };

    const fetchAttractions = async (category) => {
        try {
            let response;
            if (category === "all" || !category) {
                response = await fetch(`${API_URL}/attractions`);
            } else {
                response = await fetch(`${API_URL}/attractions/${category}`);
            }
            const data = await response.json();
            setAttractions(data.attractions);
        } catch (error) {
            console.log(error);
        }
    };

    const resetCategory = () => {
        setCategory("all");
        fetchAttractions("all");
    };

    useEffect(() => {
        fetchCategories();
        fetchPrices();
        fetchAttractions("all");
    }, []);

    return (
        <Context.Provider value={{
            attractions,
            setAttractions,
            categories,
            setCategories,
            tags,
            setTags,
            tagSearched,
            setTagSearched,
            allPrices,
            setAllPrices,
            category,
            setCategory,
            resetCategory // Provide resetCategory function
        }}>
            {children}
        </Context.Provider>
    );
}

export { Context, ContextProvider };
