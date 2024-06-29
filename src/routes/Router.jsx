import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import MenFashion from "../pages/MenFashion/MenFashion";
import WomenFashion from "../pages/WomenFashion/WomenFashion";
import KidsFashion from "../pages/KidsFashion/KidsFashion";
import SingleProductDetails from "../pages/SingleProductDetails/SingleProductDetails";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Cart from "../pages/Cart/Cart";
import Help from "../pages/Help/Help";
import AllProducts from "../pages/AllProducts/AllProducts";
import ContactUs from "../pages/ContactUs/ContactUs";
import AboutUs from "../pages/AboutUs/AboutUs";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";

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
                {
                    path: "/cart",
                    element: <Cart />
                },
                {
                    path: "/allProducts",
                    element: <AllProducts />
                },
                {
                    path: "/help",
                    element: <Help />
                },
                {
                    path: "/contactUs",
                    element: <ContactUs />
                },
                {
                    path: "/aboutUs",
                    element: <AboutUs />
                },
                {
                    path: "/termsAndConditions",
                    element: <TermsAndConditions />
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