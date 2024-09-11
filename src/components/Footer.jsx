import { FaDiscord, FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaYoutube } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import companyLogo from "../assets/Images/Footer/logo.jpg";
import companyLogo1 from "../assets/Images/Footer/logo-removebg-preview.png";
import moment from "moment";
import { useSelector } from "react-redux";

const Footer = () => {
    const userAvailability = useSelector(state => state?.user?.currentUser !== null);
    // console.log(userAvailability);
    return (
        <div className="bg-purple-200 text-black flex flex-col gap-8 lg:mt-20 md:mt-16 mt-14">
        {/* <div className="bg-gradient-to-r from-blue-700 to-purple-900 text-black flex flex-col gap-8 lg:mt-20 md:mt-16 mt-14"> */}
            {/* <div className="bg-gradient-to-r from-pink-600 to-purple-800 text-black flex flex-col gap-8 lg:mt-20 md:mt-16 mt-14"> */}
            <div className=" lg:py-12 md:py-8 py-6 text-black lg:flex lg:flex-row lg:justify-between grid md:grid-cols-2 grid-cols-1 lg:gap-0 md:gap-x-24 md:gap-y-14 gap-6 lg:pb-6 md:pb-2 pb-0 lg:px-12 md:px-7 px-5">
                <div className="md:mt-2 flex flex-col md:items-start items-center lg:w-[22%]">
                    <img className="lg:w-40 md:w-36 w-32 md:h-auto mx-auto" src={companyLogo1} alt="Treasures of Tech" />
                    <div className="lg:mt-6 md:mt-5 mt-4">
                        <p className="text-justify lg:text-base text-sm font-medium">Discover Stylish Fashion for trendy, high-quality clothing for men, women, and kids. Shop with us for exceptional style, comfort, and affordability.</p>
                    </div>
                </div>
                <div>
                    <h2 className="lg:text-2xl md:text-xl text-lg font-bold">Quick Links</h2>
                    <div className="flex md:gap-20 gap-28 lg:mt-7 md:mt-5 mt-3">
                        {
                            userAvailability &&
                            <>
                                {/* only visible for user signUp / signIn */}
                                <div className="flex flex-col lg:gap-3 md:gap-2 gap-[6px] lg:text-lg md:text-base text-sm font-medium">
                                    <ul className="">
                                        <NavLink to='/myAccount' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                                        }>My Account</NavLink>
                                    </ul>
                                    <ul className="">
                                        <NavLink to='/wishlist' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                                        }>Wishlist</NavLink>
                                    </ul>
                                    <ul className="">
                                        <NavLink to='/cart' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                                        }>Cart</NavLink>
                                    </ul>
                                    <ul className="">
                                        <NavLink to='/orderTracking' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                                        }>Order Tracking</NavLink>
                                    </ul>
                                </div>
                            </>
                        }
                        <div className="flex flex-col lg:gap-3 md:gap-2 gap-[6px] lg:text-lg md:text-base text-sm font-medium">
                            <ul className="">
                                <NavLink to='/allProducts' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                                }>All Products</NavLink>
                            </ul>
                            <ul className="">
                                <NavLink to='/aboutUs' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                                }>About Us</NavLink>
                            </ul>
                            <ul className="">
                                <NavLink to='/contactUs' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                                }>Contact Us</NavLink>
                            </ul>
                            <ul className="">
                                <NavLink to='/help' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                                }>Help</NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="lg:text-2xl md:text-xl text-lg font-bold">Reach Us</h2>
                    <div className="flex flex-col lg:gap-3 md:gap-2 gap-[6px] lg:text-lg md:text-base text-sm lg:mt-7 md:mt-5 mt-3 font-medium">
                        <p className="flex items-center gap-2"><FaEnvelope />stylefashion@gmail.com</p>
                        <p className="flex items-center gap-2"><FaPhone /> +880 0000000000</p>
                        <p></p>
                    </div>
                    <div className="lg:mt-6 md:mt-4 mt-3 flex lg:gap-7 md:gap-6 gap-5">
                        <FaFacebook className="lg:text-2xl text-xl" />
                        <FaInstagram className="lg:text-2xl text-xl" />
                        <FaDiscord className="lg:text-2xl text-xl" />
                        <FaYoutube className="lg:text-2xl text-xl" />
                    </div>
                </div>
                <div>
                    <h2 className="lg:text-2xl md:text-xl text-lg font-bold">Legal</h2>
                    <div className="flex flex-col lg:gap-3 md:gap-2 gap-[6px] lg:text-lg md:text-base text-sm lg:mt-7 md:mt-5 mt-3 font-medium">
                        <ul className="">
                            <NavLink to='/termsAndConditions' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                            }>Terms & Conditions</NavLink>
                        </ul>
                        <ul className="">
                            <NavLink to='/privacyPolicy' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                            }>Privacy Policy</NavLink>
                        </ul>
                        <ul className="">
                            <NavLink to='/cancellationAndRefundPolicy' className={({ isActive }) => isActive ? "border-b-2 border-black" : ""
                            }>Cancellation & Refund Policy</NavLink>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-purple-800 lg:py-3 md:py-[10px] py-2 px-3">
                <h3 className="text-center lg:text-lg md:text-base text-sm font-bold text-white">Copyright @{moment().format('YYYY')} Stylish Fashion. All rights reserved.</h3>
            </div>
        </div>
    );
};

export default Footer;