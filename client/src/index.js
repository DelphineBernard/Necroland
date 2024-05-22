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
import InfosPratiques from "./routes/InfosPratiques";
import PlanDuSite from "./routes/PlanDuSite";
import { ContextProvider } from "./components/Context";
import { useSelector } from "react-redux";


const IsLogged = ({ element: Element}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return isAuthenticated ? (
        <Element />
    ) : (
        <Navigate to="/connexion" />
    );
};

const IsAdmin = ({ element: Element}) => {
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
            path: "/attractions",
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
            element: <IsLogged element={Reservation} />,
        },
        // {
        //     path: "/gestion-admin",
        //     element: <IsAdmin element={Backoffice} />,
        // },
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

ReactDOM.createRoot(document.getElementById("app")).render(
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
);
// En enveloppant le router avec la balise ContextProvider je rends disponibles à tous les composants enfants, les valeurs de mon Context