import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Images/Header/logo-removebg-preview.png";
import logo1 from "../assets/Images/Header/logo.jpg";
import { FaBars, FaRegUserCircle, FaSearch, FaUserCircle } from "react-icons/fa";
import { FaCartShopping, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
    // redux
    const productQuantity = useSelector(state => state?.cart?.cartQuantity);
    console.log(productQuantity);

    // mobile view
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [click, setClick] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
        setClick(!click);
    };
    // cart product work
    const [cartItems, setCartItems] = useState(3);
    // Function to simulate adding items to the cart
    const addToCart = () => {
        setCartItems(cartItems + 1);
    };

    // user availability
    const [isUserAvailable, setUserAvailable] = useState(true);

    return (
        <div className="flex justify-between items-center lg:px-10 md:px-7 px-5 lg:py-2 md:py-[6px] py-1 border-2">
            {/* <div style={{zIndex:9999}} className="sticky top-0 bg-white flex justify-between items-center lg:px-10 md:px-7 px-5 lg:py-2 md:py-[6px] py-1 border-2"> */}
            <div className="flex flex-row gap-16">
                <div>
                    <Link to="/">
                        <img className="md:w-28 w-20" src={logo1} alt="Stylish Fashion" />
                    </Link>
                </div>
                {/* large device */}
                <div className="lg:block hidden lg:flex items-center gap-10 text-black">
                    <ul className="text-black text-xl font-semibold">
                        <NavLink to='/menFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                        }>Men</NavLink>
                    </ul>
                    <ul className="text-black text-xl font-semibold">
                        <NavLink to='/womenFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                        }>Women</NavLink>
                    </ul>
                    <ul className="text-black text-xl font-semibold">
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
                <div className="flex">
                    <Link to="/cart">
                        <FaCartShopping className="lg:text-2xl  md:text-xl text-lg text-purple-800" />
                    </Link>
                    {productQuantity > 0 && (
                        <span className="relative bottom-1 md:right-2 right-[6px] md:-mr-2 -mr-[6px] lg:px-2 md:px-[6px] px-[5px] lg:py-1 md:py-[2px] py-[1px] text-xs font-semibold text-white bg-red-600 rounded-full -translate-y-1/2">
                            {productQuantity}
                        </span>
                    )}
                    {/* {cartItems > 0 && (
                        <span className="relative bottom-1 md:right-2 right-[6px] md:-mr-2 -mr-[6px] lg:px-2 md:px-[6px] px-[5px] lg:py-1 md:py-[2px] py-[1px] text-xs font-semibold text-white bg-red-600 rounded-full -translate-y-1/2">
                            {cartItems}
                        </span>
                    )} */}
                    {/* <button onClick={addToCart} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded">Add to Cart</button> */}

                </div>
                {/* large device */}
                <div className="lg:block hidden">
                    {
                        isUserAvailable ?
                            <>
                                {/* <FaUserCircle className="lg:text-2xl  md:text-xl text-lg text-purple-800"/> */}
                                <Link to="/">
                                    <button className="py-2 lg:w-32 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800 flex items-center justify-center gap-2">
                                        <FiLogOut />
                                        Logout
                                    </button>
                                </Link>
                            </> :
                            <>
                                <Link to="/login">
                                    <button className="py-2 lg:w-32 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800">
                                        Login
                                    </button>
                                </Link>
                            </>
                    }
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
                    <div style={{ zIndex: 9999 }} className="lg:hidden absolute md:top-16 top-[72px] right-4 px-4 md:py-6 py-4 md:w-[168px] w-36 rounded-md shadow-lg border-4 border-purple-800 bg-white">
                        <ul className="block text-black md:mb-4 mb-3 md:text-base text-sm font-semibold">
                            <NavLink to='/menFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                            }>Men</NavLink>
                        </ul>
                        <ul className="block text-black md:mb-4 mb-3 md:text-base text-sm font-semibold">
                            <NavLink to='/womenFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                            }>Women</NavLink>
                        </ul>
                        <ul className="block text-black md:mb-4 mb-3 md:text-base text-sm font-semibold">
                            <NavLink to='/kidsFashion' className={({ isActive }) => isActive ? " text-purple-800 border-b-2 border-purple-800" : ""
                            }>Kids</NavLink>
                        </ul>
                        {
                            isUserAvailable ?
                                <>
                                    <Link to="/">
                                        <button className="md:py-2 py-[6px] md:w-32 w-[105px] text-white font-semibold md:text-base text-sm  rounded-lg bg-gradient-to-r from-blue-600 to-purple-800 flex items-center justify-center md:gap-2 gap-2">
                                            <FiLogOut />
                                            Logout
                                        </button>
                                    </Link>
                                </> :
                                <>
                                    <Link to="/login">
                                        <button className="md:py-2 py-[6px] md:w-32 w-24 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800">
                                            Login
                                        </button>
                                    </Link>
                                </>
                        }
                    </div>
                )}

            </div>
        </div>
    );
};

export default Header;