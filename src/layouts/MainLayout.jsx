import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { useEffect } from "react";

const MainLayout = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            {/* <Announcement /> */}
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;