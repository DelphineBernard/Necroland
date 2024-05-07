import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./routes/Accueil";
import Profil from "./routes/Profil";
import Contact from "./routes/Contact";

const router = createBrowserRouter([
    {   
        element: <Layout />,
        children: [
        {
            path: "/",
            element: <Accueil />,
        },
        //   {
        //     path: "/attractions",
        //     element: <Attractions />,
        //   },
        //   {
        //     path: "/le-parc",
        //     element: <LeParc />,
        //   },
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
        //   {
        //     path: "/connexion",
        //     element: <Connexion />,
        //   },
            {
                path: "/profil",
                element: <Profil />,
            },
        //   {
        //     path: "/cgv",
        //     element: <CGV />,
        //   },
        //   {
        //     path: "/mentions-legales",
        //     element: <MentionsLegales />,
        //   },
        //   {
        //     path: "/plan-du-site",
        //     element: <PlanDuSite />,
        //   },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("app")).render(
    <RouterProvider router={router} />
);