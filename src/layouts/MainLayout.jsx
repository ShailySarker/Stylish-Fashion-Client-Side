import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";

const MainLayout = () => {
    return (
        <>
            <Announcement />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;