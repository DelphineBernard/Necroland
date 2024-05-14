import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { createContext, useState, useEffect } from "react";

const AllPricesContext = createContext();

const Layout = () => {
    const [allPrices, setAllPrices] = useState([])

    useEffect(() => {
        const fetchPrices = async () => {
            const response = await fetch("http://localhost:3000/api/prices");
            const data = await response.json();
            setAllPrices(data.prices);
            console.log(data.prices)
        };
        fetchPrices();
    }, []);


    return (
        <AllPricesContext.Provider value={allPrices}>
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
        </AllPricesContext.Provider>
    );
};

export { Layout, AllPricesContext };