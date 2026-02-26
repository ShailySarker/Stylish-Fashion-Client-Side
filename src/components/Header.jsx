/* eslint-disable no-unused-vars */
import { Link, NavLink } from "react-router-dom";
import logo1 from "../assets/Images/Header/logo.jpg";
import { FaBars } from "react-icons/fa";
import { FaCartShopping, FaXmark, FaGauge } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { logOut } from "../redux/api/apiCalls";

// Admin panel URL — update port if your admin app runs elsewhere
const ADMIN_PANEL_URL = "http://localhost:3000";

const Header = () => {
    const dispatch = useDispatch();
    const cartQuantity = useSelector(state => state?.cart?.cartQuantity);
    const userAvailability = useSelector(state => state?.user?.currentUser !== null);
    const userInfo = useSelector(state => state?.user?.currentUser);

    // mobile view
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [click, setClick] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
        setClick(!click);
    };

    // handle logout
    const handleLogout = async () => {
        try {
            await logOut(dispatch);
            window.location.reload(true);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logout successfully!",
                showConfirmButton: false,
                timer: 3000,
            });
        } catch (error) {
            console.error('Logout failed:', error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Logout failed!",
                text: error.response?.data?.message || error?.message,
                showConfirmButton: true,
            });
        }
    };

    return (
        <div style={{ zIndex: 9999 }} className="sticky top-0 bg-white flex justify-between items-center lg:px-10 md:px-7 px-5 lg:py-2 md:py-[6px] py-1 border-2">
            <div className="flex flex-row gap-16">
                <div>
                    <Link to="/">
                        <img className="md:w-28 w-20" src={logo1} alt="Stylish Fashion" />
                    </Link>
                </div>
                {/* large device nav links */}
                <div className="lg:flex hidden items-center gap-10 text-black">
                    <ul className="text-black text-xl font-semibold">
                        <NavLink to='/menFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""}>Men</NavLink>
                    </ul>
                    <ul className="text-black text-xl font-semibold">
                        <NavLink to='/womenFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""}>Women</NavLink>
                    </ul>
                    <ul className="text-black text-xl font-semibold">
                        <NavLink to='/kidsFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""}>Kids</NavLink>
                    </ul>
                    {/* Dashboard link — only visible when logged in as admin */}
                    {userAvailability && userInfo?.isAdmin && (
                        <ul className="text-black text-xl font-semibold">
                            <a
                                href={`${ADMIN_PANEL_URL}/home`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-purple-800 font-bold hover:border-b-2 hover:border-purple-800 transition-all"
                                id="admin-dashboard-link"
                            >
                                <FaGauge className="text-lg" />
                                Dashboard
                            </a>
                        </ul>
                    )}
                </div>
            </div>

            <div className="flex items-center lg:gap-5 md:gap-4 gap-3">
                {/* mobile: show username + cart when logged in */}
                <div className="flex lg:hidden visible">
                    {userAvailability && (
                        <div className="flex items-center lg:gap-5 md:gap-4 gap-3">
                            {userInfo && (
                                <p className="font-medium lg:text-lg md:text-base text-sm flex gap-1">
                                    <span className="md:block hidden">Welcome, </span>
                                    <span className="uppercase text-purple-800 font-bold">{userInfo?.username}</span>
                                </p>
                            )}
                            <Link to="/cart">
                                <FaCartShopping className="lg:text-2xl md:text-xl text-lg text-purple-800" />
                            </Link>
                            {cartQuantity > 0 && (
                                <span className="relative bottom-1 md:right-2 right-[6px] md:-mr-2 -mr-[6px] lg:px-2 md:px-[6px] px-[5px] lg:py-1 md:py-[2px] py-[1px] text-xs font-semibold text-white bg-red-600 rounded-full -translate-y-1/2">
                                    {cartQuantity}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* large device: user info + cart + logout / login */}
                <div className="lg:block hidden">
                    {userAvailability ? (
                        <div className="flex items-center lg:gap-5 md:gap-4 gap-3">
                            <div>
                                {userInfo && (
                                    <p className="font-medium text-lg">
                                        Welcome, <span className="uppercase text-purple-800 font-bold"><Link to="/myAccount">{userInfo?.username}</Link></span>
                                    </p>
                                )}
                            </div>
                            <div className="flex">
                                <Link to="/cart">
                                    <FaCartShopping className="lg:text-2xl md:text-xl text-lg text-purple-800" />
                                </Link>
                                {cartQuantity > 0 && (
                                    <span className="relative bottom-1 md:right-2 right-[6px] md:-mr-2 -mr-[6px] lg:px-2 md:px-[6px] px-[5px] lg:py-1 md:py-[2px] py-[1px] text-xs font-semibold text-white bg-red-600 rounded-full -translate-y-1/2">
                                        {cartQuantity}
                                    </span>
                                )}
                            </div>
                            <Link to="/">
                                <button onClick={handleLogout} className="py-2 lg:w-32 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800 flex items-center justify-center gap-2">
                                    <FiLogOut />
                                    Logout
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="py-2 lg:w-32 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800">
                                    Login
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* mobile hamburger */}
                <div className="lg:hidden visible">
                    <button className="text-white focus:outline-none" onClick={toggleMobileMenu}>
                        {click ? (<FaXmark className="text-purple-800 font-bold md:text-xl text-lg" />) : (<FaBars className="text-purple-800 font-bold md:text-xl text-lg" />)}
                    </button>
                </div>

                {/* Mobile menu dropdown */}
                {isMobileMenuOpen && (
                    <div style={{ zIndex: 9999 }} className="lg:hidden absolute md:top-16 top-[72px] right-4 px-4 md:py-6 py-4 md:w-48 w-40 rounded-md shadow-lg border-4 border-purple-800 bg-white">
                        <ul className="block text-black md:mb-4 mb-3 md:text-base text-sm font-semibold">
                            <NavLink to='/menFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""}>Men</NavLink>
                        </ul>
                        <ul className="block text-black md:mb-4 mb-3 md:text-base text-sm font-semibold">
                            <NavLink to='/womenFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""}>Women</NavLink>
                        </ul>
                        <ul className="block text-black md:mb-4 mb-3 md:text-base text-sm font-semibold">
                            <NavLink to='/kidsFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""}>Kids</NavLink>
                        </ul>
                        {/* Dashboard option for admin in mobile menu */}
                        {userAvailability && userInfo?.isAdmin && (
                            <ul className="block md:mb-4 mb-3">
                                <a
                                    href={`${ADMIN_PANEL_URL}/home`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-purple-800 md:text-base text-sm font-bold"
                                >
                                    <FaGauge className="text-base" />
                                    Dashboard
                                </a>
                            </ul>
                        )}
                        <div className="w-full">
                            {userAvailability ? (
                                <>
                                    <Link to="/">
                                        <button onClick={handleLogout} className="md:w-[136px] w-[104px] md:py-2 py-[6px] text-white font-semibold md:text-base text-sm rounded-lg bg-gradient-to-r from-blue-600 to-purple-800 flex items-center justify-center md:gap-2 gap-2">
                                            <FiLogOut />
                                            Logout
                                        </button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <button className="md:w-[136px] w-[104px] md:py-2 py-[6px] text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800">
                                            Login
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;