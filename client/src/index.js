import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./routes/Accueil";
import Attractions from "./routes/Attractions";
import Profil from "./routes/Profil";
import Contact from "./routes/Contact";
import Connexion from "./routes/Connexion";
import Inscription from "./routes/Inscription";
import LeParc from "./routes/LeParc";
import MentionsLegales from "./routes/MentionsLegales";
import Erreur from "./routes/Erreur";

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
        //   {
        //     path: "/infos-pratiques",
        //     element: <InfosPratiques />,
        //   },
        {
            path: "/contact",
            element: <Contact />,
        },
        //   {
        //     path: "/reservation",
        //     element: <Reservation />,
        //   },
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
            element: <Profil />,
        },
        //   {
        //     path: "/cgv",
        //     element: <CGV />,
        //   },
        {
            path: "/mentions-legales",
            element: <MentionsLegales />,
        },
        //   {
        //     path: "/plan-du-site",
        //     element: <PlanDuSite />,
        //   },
        {
            path: "/erreur",
            element: <Erreur />,
        },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("app")).render(
    <RouterProvider router={router} />
);