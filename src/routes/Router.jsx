import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import MenFashion from "../pages/MenFashion/MenFashion";

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
        ]
    }
]);

export default router;