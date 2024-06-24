import { useState } from "react";
import MyShopping from "./Components/MyShopping";
import MyWishlist from "./Components/MyWishlist";

const Cart = () => {
    const [isToggle, setToggle] = useState(1);
    const handleToggleWork = (id) => {
        setToggle(id);
    };

    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Selecting Product</h1>
            </div>
            <div className="flex justify-between items-start lg:mt-5 md:mt-4 mt-3">
                <button className="md:py-2 py-[6px] lg:w-44 md:w-32 w-24 font-semibold lg:text-lg rounded-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800 border-2 border-purple-800 shadow-lg" >Continue Shopping</button>
                <div className="flex">
                    <div>
                        <h4 onClick={() => handleToggleWork(1)} className={`font-semibold lg:text-lg px-2 ${isToggle === 1 ? "text-purple-800 border-b-2 border-purple-800 myShopping" : "text-[#BDC3C7]"}`}>My Shopping</h4>
                        <div className={isToggle === 1 ? "myShopping" : "hidden"}>
                            <MyShopping />
                        </div>
                    </div>
                    <div>
                        <h4 onClick={() => handleToggleWork(2)} className={`font-semibold lg:text-lg px-2 ${isToggle === 2 ? "text-purple-800 border-b-2 border-purple-800 myWishlist" : "text-[#BDC3C7]"}`}>My Wishlist</h4>
                        <div className={isToggle === 2 ? "myWishlist" : "hidden"}>
                            <MyWishlist />
                        </div>
                    </div>
                </div>
                <button className="md:py-2 py-[6px] lg:w-44 md:w-32 w-24 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800 shadow-lg">Checkout Now</button>
            </div>
        </div>
    );
};

export default Cart;