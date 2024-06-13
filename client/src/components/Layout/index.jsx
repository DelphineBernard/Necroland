import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { checkToken } from "../../actions/authActions.js";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const Layout = () => {

    // const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // Au chargement de l'application, vérifie si un token est présent dans le locaLStorage pour maintenir l'état de connexion
        dispatch(checkToken());
    }, [dispatch]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 2000);

    //     return () => clearTimeout(timer);
    //     }, []);

    // if (isLoading) {
    //     return (
    //     <main>
    //         <Box sx={{ color: "white", width:"100%", height: "100vh", display: "flex", flexDirection: "column", rowGap: "2rem", justifyContent: "center", alignItems: "center" }}>
    //             <CircularProgress color="inherit" />
    //             Chargement en cours, merci de patienter...
    //         </Box>
    //     </main>
    //     )
    // }
    
    return (

        <>
            <Header />
            <Outlet />
            <Footer />
        </>

    );
};

export default Layout;