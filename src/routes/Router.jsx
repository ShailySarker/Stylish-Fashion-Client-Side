import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LazyLoader from "../components/LazyLoader";
import MainLayout from "../layouts/MainLayout";
import PrivateRouter from "./PrivateRouter";

const Home = React.lazy(() => import("../pages/Home/Home"));
const MenFashion = React.lazy(() => import("../pages/MenFashion/MenFashion"));
const WomenFashion = React.lazy(() => import("../pages/WomenFashion/WomenFashion"));
const KidsFashion = React.lazy(() => import("../pages/KidsFashion/KidsFashion"));
const SingleProductDetails = React.lazy(() => import("../pages/SingleProductDetails/SingleProductDetails"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const SignUp = React.lazy(() => import("../pages/SignUp/SignUp"));
const Cart = React.lazy(() => import("../pages/Cart/Cart"));
const Help = React.lazy(() => import("../pages/Help/Help"));
const AllProducts = React.lazy(() => import("../pages/AllProducts/AllProducts"));
const ContactUs = React.lazy(() => import("../pages/ContactUs/ContactUs"));
const AboutUs = React.lazy(() => import("../pages/AboutUs/AboutUs"));
const TermsAndConditions = React.lazy(() => import("../pages/TermsAndConditions/TermsAndConditions"));
const PrivacyPolicy = React.lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"));
const CancellationAndRefundPolicy = React.lazy(() => import("../pages/CancellationAndRefundPolicy/CancellationAndRefundPolicy"));
const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const MyAccount = React.lazy(() => import("../pages/MyAccount/MyAccount"));
const Wishlist = React.lazy(() => import("../pages/Wishlist/Wishlist"));
const OrderTracking = React.lazy(() => import("../pages/OrderTracking/OrderTracking"));

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <Home />
                    </Suspense>
                },
                {
                    path: "/menFashion",
                    element:
                        <Suspense fallback={
                            <LazyLoader />}>
                            <MenFashion />
                        </Suspense>
                },
                {
                    path: "/womenFashion",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <WomenFashion />
                    </Suspense>
                },
                {
                    path: "/kidsFashion",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <KidsFashion />
                    </Suspense>
                },
                {
                    path: "/product/:id",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <PrivateRouter>
                            <SingleProductDetails />
                        </PrivateRouter>
                    </Suspense>
                },
                {
                    path: "/cart",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <PrivateRouter>
                            <Cart />
                        </PrivateRouter>
                    </Suspense>
                },
                {
                    path: "/allProducts",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <AllProducts />
                    </Suspense>
                },
                {
                    path: "/help",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <Help />
                    </Suspense>
                },
                {
                    path: "/contactUs",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <ContactUs />
                    </Suspense>
                },
                {
                    path: "/aboutUs",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <AboutUs />
                    </Suspense>
                },
                {
                    path: "/termsAndConditions",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <TermsAndConditions />
                    </Suspense>
                },
                {
                    path: "/privacyPolicy",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <PrivacyPolicy />
                    </Suspense>
                },
                {
                    path: "/cancellationAndRefundPolicy",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <CancellationAndRefundPolicy />
                    </Suspense>
                },
                {
                    path: "/myAccount",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <PrivateRouter>
                            <MyAccount />
                        </PrivateRouter>
                    </Suspense>
                },
                {
                    path: "/wishlist",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <PrivateRouter>
                            <Wishlist />
                        </PrivateRouter>
                    </Suspense>
                },
                {
                    path: "/orderTracking",
                    element: <Suspense fallback={
                        <LazyLoader />}>
                        <PrivateRouter>
                            <OrderTracking />
                        </PrivateRouter>
                    </Suspense>
                },

            ]
        },
        {
            path: "/login",
            element: <Suspense fallback={
                <LazyLoader />}>
                <Login />
            </Suspense>
        },
        {
            path: "/signUp",
            element: <Suspense fallback={
                <LazyLoader />}>
                <SignUp />
            </Suspense>
        },
        {
            path: "/*",
            element: <Suspense fallback={
                <LazyLoader />}>
                <NotFound />
            </Suspense>
        }
    ]
);

export default router;