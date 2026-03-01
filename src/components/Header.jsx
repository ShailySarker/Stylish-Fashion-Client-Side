/* eslint-disable no-unused-vars */
import { Link, NavLink } from "react-router-dom";
import logo1 from "../assets/Images/Header/logo.jpg";
import { FaBars } from "react-icons/fa";
import {
    FaCartShopping,
    FaXmark,
    FaGauge,
    FaHeart,
    FaChevronDown,
    FaBoxOpen,
    FaUser,
    FaRightFromBracket,
} from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
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
    const isAdmin = userAvailability && userInfo?.isAdmin;

    // Mobile menu state
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [click, setClick] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
        setClick(!click);
    };

    // User dropdown state (desktop)
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle logout
    const handleLogout = async () => {
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
        try {
            await logOut(dispatch);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logout successfully!",
                showConfirmButton: false,
                timer: 2000,
            });
            window.location.href = "/";
        } catch (error) {
            console.error("Logout failed:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Logout failed!",
                text: error.response?.data?.message || error?.message,
                showConfirmButton: true,
            });
        }
    };

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-purple-800 border-b-2 border-purple-800"
            : "hover:text-purple-700 transition-colors duration-200";

    return (
        <div
            style={{ zIndex: 9999 }}
            className="sticky top-0 bg-white flex justify-between items-center lg:px-10 md:px-7 px-5 lg:py-2 md:py-[6px] py-1 border-b-2 border-gray-100 shadow-sm"
        >
            {/* ── Left: Logo + Desktop Nav ── */}
            <div className="flex items-center gap-12">
                {/* Logo */}
                <Link to="/">
                    <img className="md:w-28 w-20" src={logo1} alt="Stylish Fashion" />
                </Link>

                {/* Desktop nav links */}
                <nav className="lg:flex hidden items-center gap-8 text-black text-[17px] font-semibold">
                    <NavLink to="/menFashion" className={navLinkClass}>Men</NavLink>
                    <NavLink to="/womenFashion" className={navLinkClass}>Women</NavLink>
                    <NavLink to="/kidsFashion" className={navLinkClass}>Kids</NavLink>
                    <NavLink to="/allProducts" className={navLinkClass}>All Products</NavLink>
                    <NavLink to="/newArrivalProducts" className={navLinkClass}>New Arrivals</NavLink>

                    {/* Admin-only: Dashboard link */}
                    {isAdmin && (
                        <a
                            href={`${ADMIN_PANEL_URL}/home`}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="admin-dashboard-link"
                            className="flex items-center gap-[6px] text-purple-800 font-bold
                                       border border-purple-800 rounded-lg px-3 py-1
                                       hover:bg-purple-800 hover:text-white
                                       transition-all duration-200"
                        >
                            <FaGauge className="text-base" />
                            Dashboard
                        </a>
                    )}
                </nav>
            </div>

            {/* ── Right: Cart + User / Login ── */}
            <div className="flex items-center lg:gap-5 md:gap-4 gap-3">

                {/* Cart icon (visible when logged in) */}
                {userAvailability && (
                    <Link to="/cart" className="relative flex items-center">
                        <FaCartShopping className="lg:text-2xl md:text-xl text-lg text-purple-800" />
                        {cartQuantity > 0 && (
                            <span className="absolute -top-2 -right-2 px-[6px] py-[1px] text-[10px] font-bold
                                             text-white bg-red-600 rounded-full leading-4">
                                {cartQuantity}
                            </span>
                        )}
                    </Link>
                )}

                {/* ── Desktop: User dropdown / Login ── */}
                <div className="lg:flex hidden items-center">
                    {userAvailability ? (
                        <div className="relative" ref={dropdownRef}>
                            {/* Trigger button */}
                            <button
                                id="user-menu-btn"
                                onClick={() => setUserDropdownOpen(prev => !prev)}
                                className="flex items-center gap-2 px-3 py-[7px] rounded-xl
                                           border-2 border-purple-800 text-purple-800 font-semibold
                                           hover:bg-purple-800 hover:text-white
                                           transition-all duration-200 text-sm"
                            >
                                {/* Avatar initials */}
                                <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-700
                                                 text-white rounded-full flex items-center justify-center
                                                 text-xs font-bold uppercase shrink-0">
                                    {userInfo?.username?.charAt(0) || "U"}
                                </span>
                                <span className="max-w-[96px] truncate uppercase">{userInfo?.username}</span>
                                {/* Admin badge */}
                                {isAdmin && (
                                    <span className="text-[10px] font-bold bg-amber-400 text-amber-900
                                                     px-[6px] py-[1px] rounded-full leading-4">
                                        ADMIN
                                    </span>
                                )}
                                <FaChevronDown
                                    className={`text-xs transition-transform duration-200
                                               ${isUserDropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Dropdown panel */}
                            {isUserDropdownOpen && (
                                <div
                                    className="absolute right-0 top-[calc(100%+8px)] w-56
                                               bg-white rounded-xl shadow-xl border border-gray-200
                                               overflow-hidden z-50 animate-fadeIn"
                                >
                                    {/* User info header */}
                                    <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                                        <p className="text-xs text-gray-500">Signed in as</p>
                                        <p className="text-sm font-bold text-purple-800 uppercase truncate">
                                            {userInfo?.username}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">{userInfo?.email}</p>
                                    </div>

                                    {/* Common user links */}
                                    <div className="py-1">
                                        <DropdownLink
                                            to="/myAccount"
                                            icon={<FaUser className="text-purple-600" />}
                                            label="My Account"
                                            onClick={() => setUserDropdownOpen(false)}
                                        />
                                        <DropdownLink
                                            to="/wishlist"
                                            icon={<FaHeart className="text-rose-500" />}
                                            label="My Wishlist"
                                            onClick={() => setUserDropdownOpen(false)}
                                        />
                                        <DropdownLink
                                            to="/orderTracking"
                                            icon={<FaBoxOpen className="text-blue-500" />}
                                            label="Order Tracking"
                                            onClick={() => setUserDropdownOpen(false)}
                                        />
                                    </div>

                                    {/* Admin-only section */}
                                    {isAdmin && (
                                        <>
                                            <div className="border-t border-dashed border-purple-200 mx-3" />
                                            <div className="py-1">
                                                <p className="px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-600">
                                                    Admin
                                                </p>
                                                <a
                                                    href={`${ADMIN_PANEL_URL}/home`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    id="admin-dashboard-dropdown-link"
                                                    onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm
                                                               text-gray-700 font-medium
                                                               hover:bg-purple-50 hover:text-purple-800
                                                               transition-colors duration-150"
                                                >
                                                    <FaGauge className="text-purple-700 text-base" />
                                                    Dashboard
                                                </a>
                                                <a
                                                    href={`${ADMIN_PANEL_URL}/users`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm
                                                               text-gray-700 font-medium
                                                               hover:bg-purple-50 hover:text-purple-800
                                                               transition-colors duration-150"
                                                >
                                                    <FaUser className="text-purple-700 text-base" />
                                                    Manage Users
                                                </a>
                                                <a
                                                    href={`${ADMIN_PANEL_URL}/products`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm
                                                               text-gray-700 font-medium
                                                               hover:bg-purple-50 hover:text-purple-800
                                                               transition-colors duration-150"
                                                >
                                                    <FaBoxOpen className="text-purple-700 text-base" />
                                                    Manage Products
                                                </a>
                                                <a
                                                    href={`${ADMIN_PANEL_URL}/transactions`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2 text-sm
                                                               text-gray-700 font-medium
                                                               hover:bg-purple-50 hover:text-purple-800
                                                               transition-colors duration-150"
                                                >
                                                    <FaGauge className="text-purple-700 text-base" />
                                                    Transactions
                                                </a>
                                            </div>
                                        </>
                                    )}

                                    {/* Logout */}
                                    <div className="border-t border-gray-100 py-1">
                                        <button
                                            onClick={handleLogout}
                                            id="logout-btn"
                                            className="flex items-center gap-3 w-full px-4 py-2 text-sm
                                                       text-red-600 font-semibold
                                                       hover:bg-red-50
                                                       transition-colors duration-150"
                                        >
                                            <FaRightFromBracket />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <button
                                    id="login-btn"
                                    className="py-2 w-24 text-white font-semibold text-base rounded-lg
                                               bg-gradient-to-r from-blue-600 to-purple-800
                                               hover:opacity-90 transition-opacity"
                                >
                                    Login
                                </button>
                            </Link>
                            <Link to="/signUp">
                                <button
                                    id="signup-btn"
                                    className="py-2 w-24 font-semibold text-base rounded-lg border-2
                                               border-purple-800 text-purple-800
                                               hover:bg-purple-800 hover:text-white transition-all"
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* ── Mobile hamburger ── */}
                <div className="lg:hidden visible">
                    <button className="text-white focus:outline-none" onClick={toggleMobileMenu}>
                        {click
                            ? <FaXmark className="text-purple-800 font-bold md:text-xl text-lg" />
                            : <FaBars className="text-purple-800 font-bold md:text-xl text-lg" />
                        }
                    </button>
                </div>

                {/* ── Mobile dropdown menu ── */}
                {isMobileMenuOpen && (
                    <div
                        style={{ zIndex: 9999 }}
                        className="lg:hidden absolute md:top-[60px] top-[56px] right-4
                                   w-64 rounded-xl shadow-2xl border-2 border-purple-800 bg-white overflow-hidden"
                    >
                        {/* User info strip (when logged in) */}
                        {userAvailability && (
                            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-purple-100">
                                <div className="flex items-center gap-2">
                                    <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-700
                                                     text-white rounded-full flex items-center justify-center
                                                     text-sm font-bold uppercase shrink-0">
                                        {userInfo?.username?.charAt(0) || "U"}
                                    </span>
                                    <div>
                                        <p className="text-sm font-bold text-purple-800 uppercase">{userInfo?.username}</p>
                                        {isAdmin && (
                                            <span className="text-[10px] font-bold bg-amber-400 text-amber-900
                                                             px-[6px] py-[1px] rounded-full">
                                                ADMIN
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Nav links */}
                        <div className="px-4 py-3 flex flex-col gap-3">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Shop</p>
                            <MobileNavLink to="/menFashion" label="Men" onClick={toggleMobileMenu} />
                            <MobileNavLink to="/womenFashion" label="Women" onClick={toggleMobileMenu} />
                            <MobileNavLink to="/kidsFashion" label="Kids" onClick={toggleMobileMenu} />
                            <MobileNavLink to="/allProducts" label="All Products" onClick={toggleMobileMenu} />
                            <MobileNavLink to="/newArrivalProducts" label="New Arrivals" onClick={toggleMobileMenu} />
                        </div>

                        {/* User links (when logged in) */}
                        {userAvailability && (
                            <>
                                <div className="border-t border-dashed border-gray-200 mx-4" />
                                <div className="px-4 py-3 flex flex-col gap-3">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Account</p>
                                    <MobileNavLink to="/myAccount" icon={<FaUser className="text-purple-500" />} label="My Account" onClick={toggleMobileMenu} />
                                    <MobileNavLink to="/wishlist" icon={<FaHeart className="text-rose-500" />} label="My Wishlist" onClick={toggleMobileMenu} />
                                    <MobileNavLink to="/orderTracking" icon={<FaBoxOpen className="text-blue-500" />} label="Order Tracking" onClick={toggleMobileMenu} />
                                </div>
                            </>
                        )}

                        {/* Admin links (when admin) */}
                        {isAdmin && (
                            <>
                                <div className="border-t border-dashed border-purple-200 mx-4" />
                                <div className="px-4 py-3 flex flex-col gap-3">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Admin</p>
                                    <MobileExternalLink
                                        href={`${ADMIN_PANEL_URL}/home`}
                                        icon={<FaGauge className="text-purple-600" />}
                                        label="Dashboard"
                                        onClick={toggleMobileMenu}
                                    />
                                    <MobileExternalLink
                                        href={`${ADMIN_PANEL_URL}/users`}
                                        icon={<FaUser className="text-purple-600" />}
                                        label="Manage Users"
                                        onClick={toggleMobileMenu}
                                    />
                                    <MobileExternalLink
                                        href={`${ADMIN_PANEL_URL}/products`}
                                        icon={<FaBoxOpen className="text-purple-600" />}
                                        label="Manage Products"
                                        onClick={toggleMobileMenu}
                                    />
                                    <MobileExternalLink
                                        href={`${ADMIN_PANEL_URL}/transactions`}
                                        icon={<FaGauge className="text-purple-600" />}
                                        label="Transactions"
                                        onClick={toggleMobileMenu}
                                    />
                                </div>
                            </>
                        )}

                        {/* Auth actions */}
                        <div className="border-t border-gray-200 px-4 py-3">
                            {userAvailability ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center gap-2 w-full py-2 rounded-lg
                                               bg-gradient-to-r from-red-500 to-rose-600
                                               text-white text-sm font-semibold"
                                >
                                    <FiLogOut />
                                    Logout
                                </button>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link to="/login" onClick={toggleMobileMenu}>
                                        <button className="w-full py-2 text-white text-sm font-semibold rounded-lg
                                                           bg-gradient-to-r from-blue-600 to-purple-800">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/signUp" onClick={toggleMobileMenu}>
                                        <button className="w-full py-2 text-sm font-semibold rounded-lg
                                                           border-2 border-purple-800 text-purple-800
                                                           hover:bg-purple-800 hover:text-white transition-all">
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ── Small reusable sub-components ── */

const DropdownLink = ({ to, icon, label, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 font-medium
                   hover:bg-purple-50 hover:text-purple-800 transition-colors duration-150"
    >
        {icon}
        {label}
    </Link>
);

const MobileNavLink = ({ to, icon, label, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `flex items-center gap-2 text-sm font-semibold
             ${isActive ? "text-purple-800" : "text-gray-700"}`
        }
    >
        {icon}
        {label}
    </NavLink>
);

const MobileExternalLink = ({ href, icon, label, onClick }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="flex items-center gap-2 text-sm font-semibold text-gray-700
                   hover:text-purple-800 transition-colors"
    >
        {icon}
        {label}
    </a>
);

export default Header;