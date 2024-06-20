import { NavLink } from "react-router-dom";
import logo from "../assets/Images/Header/logo-removebg-preview.png";
import logo1 from "../assets/Images/Header/logo.jpg";
import { FaBars, FaSearch } from "react-icons/fa";
import { FaCartShopping, FaXmark } from "react-icons/fa6";
import { useState } from "react";

const Header = () => {
    // mobile view
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [click, setClick] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
        setClick(!click);
    };
    // cart product work
    const [cartItems, setCartItems] = useState(0);
    // Function to simulate adding items to the cart
    const addToCart = () => {
        setCartItems(cartItems + 1);
    };
    return (
        <div className="flex justify-between items-center lg:px-10 md:px-7 px-5 lg:py-2 md:py-[6px] py-1 border-2">
            <div className="flex flex-row gap-16">
                <div>
                    <img className="md:w-28 w-20" src={logo1} alt="" />
                </div>
                {/* large device */}
                <div className="lg:block hidden lg:flex items-center gap-10 text-black">
                    <ul className="text-black text-xl font-medium">
                        <NavLink to='/menFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                        }>Men</NavLink>
                    </ul>
                    <ul className="text-black text-xl font-medium">
                        <NavLink to='/womenFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                        }>Women</NavLink>
                    </ul>
                    <ul className="text-black text-xl font-medium">
                        <NavLink to='/kidsFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                        }>Kids</NavLink>
                    </ul>
                </div>
            </div>
            {/* medium device search bar */}
            <div className="relative flex border-2 rounded-lg lg:hidden md:block hidden">
                <FaSearch className="absolute lg:left-5 md:left-4 left-[14px] top-1/2 transform -translate-y-1/2 text-gray-500 lg:text-base text-sm" />
                <input className="py-[6px] pl-10 lg:px-12 md:px-11 px-14 rounded-lg lg:w-80 md:w-72 w-10 lg:font-medium text-black" type="search" name="search" id="" placeholder="Search..." />
            </div>
            <div className="flex items-center lg:gap-5 md:gap-4 gap-3">
                {/* large device search bar */}
                <div className="relative flex border-2 rounded-lg lg:block hidden">
                    <FaSearch className="absolute lg:left-5 md:left-4 left-[14px] top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input className="md:py-2 py-[6px] pl-10 lg:px-12 md:px-11 px-14 rounded-lg lg:w-80 md:w-80 w-80 font-medium text-black" type="search" name="search" id="" placeholder="Search..." />
                </div>
                <div>
                    <FaCartShopping className="lg:text-2xl  md:text-xl text-lg" />
                    {/* 
                    {cartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartItems}
                </span>
            )}
            <button onClick={addToCart} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">Add to Cart</button>
         */}
                </div>
                {/* large device */}
                <div className="lg:block hidden">
                    <button className="py-2 lg:w-32 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800">
                        Login
                    </button>
                    {/* <button className="py-2 lg:w-32 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 via-pink-700 to-purple-700">
                        Login
                    </button> */}
                </div>
                {/* medium and small device menu */}
                <div className="lg:hidden visible">
                    <button className="text-white focus:outline-none"
                        onClick={toggleMobileMenu}>
                        {click ? (<FaXmark className="text-purple-800 font-bold md:text-xl text-lg" />) : (<FaBars className="text-purple-800 font-bold md:text-xl text-lg" />)}
                    </button>
                </div>
                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div style={{ zIndex: 9999 }} className="lg:hidden absolute top-16 right-4 px-4 md:py-6 py-4 md:w-[168px] w-40 rounded-md shadow-lg border-4 border-purple-800 bg-white">
                        <ul className="block text-black md:mb-4 mb-3 md:text-base text-sm font-medium">
                            <NavLink to='/menFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                            }>Men</NavLink>
                        </ul>
                        <ul className="block text-black md:mb-4 mb-3 md:text-base text-sm font-medium">
                            <NavLink to='/womenFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                            }>Women</NavLink>
                        </ul>
                        <ul className="block text-black md:mb-4 mb-3 md:text-base text-sm font-medium">
                            <NavLink to='/kidsFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                            }>Kids</NavLink>
                        </ul>
                        <button className="py-2 md:w-32 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800">
                            Login
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Header;