import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import MenFashion from "../pages/MenFashion/MenFashion";
import WomenFashion from "../pages/WomenFashion/WomenFashion";
import KidsFashion from "../pages/KidsFashion/KidsFashion";
import SingleProductDetails from "../pages/SingleProductDetails/SingleProductDetails";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

const router = createBrowserRouter(
    [
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
                {
                    path: "/singleProductDetails",
                    element: <SingleProductDetails />
                },
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signUp",
            element: <SignUp />
        }
    ]
);

export default router;