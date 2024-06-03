import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./routes/Accueil";
import Attractions from "./routes/Attractions";
import Profil from "./routes/Profil";
import Contact from "./routes/Contact";
import Reservation from "./routes/Reservation";
import Connexion from "./routes/Connexion";
import Inscription from "./routes/Inscription";
import LeParc from "./routes/LeParc";
import MentionsLegales from "./routes/MentionsLegales";
import CGV from "./routes/CGV";
import Erreur from "./routes/Erreur";
import Backoffice from "./routes/Backoffice";
import InfosPratiques from "./routes/InfosPratiques";
import PlanDuSite from "./routes/PlanDuSite";
import { ContextProvider } from "./components/Context";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { responsiveFontSizes } from '@mui/material/styles';
import { grey, red } from "@mui/material/colors";
import { Provider } from "react-redux";
import store from "./store/store";


const IsLogged = ({ element: Element }) => {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? (
        <Element />
    ) : (
        <Navigate to="/connexion" />
    );
};

const IsAdmin = ({ element: Element }) => {
    const isAdmin = useSelector(state => state.auth.isAdmin);

    return isAdmin ? (
        <Element />
    ) : (
        <Navigate to="/erreur" />
    );
};

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Accueil />,
            },
            {
                path: "/attractions/:category?",
                element: <Attractions />,
            },
            {
                path: "/le-parc",
                element: <LeParc />,
            },
            {
                path: "/infos-pratiques",
                element: <InfosPratiques />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/reservation",
                element: < IsLogged element={Reservation} />,
            },
            {
                path: "/gestion-admin",
                element: <IsAdmin element={Backoffice} />,
            },
            {
                path: "/connexion",
                element: <Connexion />,
            },
            {
                path: "/inscription",
                element: <Inscription />,
            },
            {
                path: "/profil",
                element: <IsLogged element={Profil} />,
            },
            {
                path: "/cgv",
                element: <CGV />,
            },
            {
                path: "/mentions-legales",
                element: <MentionsLegales />,
            },
            {
                path: "/plan-du-site",
                element: <PlanDuSite />,
            },
            {
                path: "/erreur",
                element: <Erreur />,
            },
        ]
    }
]);

const theme = createTheme({
    palette: {
        primary: {
            main: grey[800],
        },
        secondary: {
            main: grey[100],
        },
    },
    typography: {
        h1: {
            fontSize: "3rem",
            '@media (max-width:1920px)': {
                fontSize: '2.5rem',
            },
            '@media (max-width:1280px)': {
                fontSize: '2.25rem',
            },
            '@media (max-width:960px)': {
                fontSize: '2rem',
            },
            '@media (max-width:600px)': {
                fontSize: '1.75rem',
            },
        },
        h2: {
            fontSize: "2.5rem",
            '@media (max-width:1920px)': {
                fontSize: '2rem',
            },
            '@media (max-width:1280px)': {
                fontSize: '1.75rem',
            },
            '@media (max-width:960px)': {
                fontSize: '1.5rem',
            },
            '@media (max-width:600px)': {
                fontSize: '1.25rem',
            },
        },
        h3: {
            fontSize: '2rem',
            '@media (max-width:1920px)': {
                fontSize: '1.75rem',
            },
            '@media (max-width:1280px)': {
                fontSize: '1.5rem',
            },
            '@media (max-width:960px)': {
                fontSize: '1.25rem',
            },
            '@media (max-width:600px)': {
                fontSize: '1rem',
            },
        },
        body1: {
            '@media (max-width:1920px)': {
                fontSize: '1.25rem',
            },
            '@media (max-width:1280px)': {
                fontSize: '1rem',
            },
            '@media (max-width:960px)': {
                fontSize: '0.85rem',
            },
            '@media (max-width:600px)': {
                fontSize: '0.8rem',
            },
        },
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    columnGap: '1rem',
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: grey[800],
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: red[900],
                    color: 'white',
                    '&:hover': {
                        backgroundColor: red[600],
                        color: 'white',
                    },
                },
            },
        },
        MuiFilledInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    width: "100%",
                    rowGap: '1rem',
                }
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: 'black',
                }
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById("app")).render(
    <ContextProvider>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </Provider>
    </ContextProvider>
);
// En enveloppant le router avec la balise ContextProvider je rends disponibles à tous les composants enfants, les valeurs de mon Context