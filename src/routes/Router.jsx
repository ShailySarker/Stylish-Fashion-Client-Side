import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import MenFashion from "../pages/MenFashion/MenFashion";
import WomenFashion from "../pages/WomenFashion/WomenFashion";
import KidsFashion from "../pages/KidsFashion/KidsFashion";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/menFashion",
                element: <MenFashion />
            },
            {
                path: "/womenFashion",
                element: <WomenFashion />
            },
            {
                path: "/kidsFashion",
                element: <KidsFashion />
            },
        ]
    }
]);

export default router;