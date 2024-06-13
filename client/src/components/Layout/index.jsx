import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { checkToken } from "../../actions/authActions.js";

const Layout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Au chargement de l'application, vérifie si un token est présent dans le locaLStorage pour maintenir l'état de connexion
        dispatch(checkToken());
    }, [dispatch]);
    
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;