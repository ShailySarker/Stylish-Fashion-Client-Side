import { useState } from "react";
import MyShopping from "./Components/MyShopping";
import MyWishlist from "./Components/MyWishlist";
import product from "../../assets/Images/Home/OurProducts_womenBardotDress.jpg";
import { FaMinus, FaPlus } from "react-icons/fa6";
const Cart = () => {
    const [isToggle, setToggle] = useState(1);
    const handleToggleWork = (id) => {
        setToggle(id);
    };
    const [countProductQuantity, setCountProductQuantity] = useState(1);
    const handleIncreaseProduct = () => {
        setCountProductQuantity(countProductQuantity + 1);
    };
    const handleDecreaseProduct = () => {
        if (countProductQuantity > 0) {
            setCountProductQuantity(countProductQuantity - 1);
        }
    };
    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Selecting Product</h1>
            </div>
            <div className="flex justify-between items-start lg:mt-16 md:mt-10 mt-8">
                <button className="md:py-2 py-[6px] lg:w-44 md:w-40 w-40 font-semibold lg:text-lg rounded-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-800 border-2 border-purple-800 shadow-lg" >Continue Shopping</button>
                <div className="md:block hidden md:flex lg:gap-8 md:gap-4">
                    <div>
                        <h4 onClick={() => handleToggleWork(1)} className={`font-semibold lg:text-xl md:text-lg md:px-2 px-1 text-center ${isToggle === 1 ? "text-black border-b-2 border-black myShopping" : "text-[#BDC3C7]"}`}>My Shopping(2)</h4>
                        <div className={isToggle === 1 ? "myShopping" : "hidden"}>
                            <MyShopping />
                        </div>
                    </div>
                    <div>
                        <h4 onClick={() => handleToggleWork(2)} className={`font-semibold lg:text-xl md:text-lg md:px-2 px-1 text-center ${isToggle === 2 ? "text-black border-b-2 border-black myWishlist" : "text-[#BDC3C7]"}`}>My Wishlist(0)</h4>
                        <div className={isToggle === 2 ? "myWishlist" : "hidden"}>
                            <MyWishlist />
                        </div>
                    </div>
                </div>
                <button className="md:py-2 py-[6px] lg:w-44 md:w-36 w-40 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800 shadow-lg">Checkout Now</button>
            </div>
            <div className="flex lg:flex-row flex-col lg:gap-10 md:gap-8 gap-7 lg:mt-12 md:mt-10 mt-6 items-start">
                {/* product Details */}
                <div className="lg:w-2/3 w-full flex flex-col lg:gap-4 md:gap-3 gap-[10px]">
                    <div className="flex items-center justify-between border-2 rounded-lg lg:p-5 md:p-4 p-3 shadow-lg">
                        <div className="flex items-center lg:gap-8 md:gap-5 gap-3">
                            <div className="lg:h-52 md:h-36 h-28 lg:w-48 md:w-32 w-24">
                                <img className="h-full w-full" src={product} alt="product" />
                            </div>
                            <div className="flex flex-col lg:gap-3 md:gap-2 gap-1">
                                <h4 className="text-black lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">ID:</span> 1111</h4>
                                <h4 className="text-black lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">Product Name:</span> Women Bardot Dress</h4>
                                {/* <h4>Product Name: Women Bardot Dress</h4> */}
                                <h4 className="text-black lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">Size:</span> M</h4>
                                <div className="flex items-center lg:gap-3 md:gap-2 gap-1">
                                    <p className="lg:text-lg md:text-base text-sm font-semibold">Quantity: </p>
                                    <div className="flex items-center lg:text-xl md:text-lg text-base font-semibold lg:gap-3 md:gap-[10px] gap-2">
                                        <h4 className="border-2 border-[#787878] bg-white lg:p-2 p-1 rounded-lg" onClick={handleDecreaseProduct}><FaMinus className="lg:text-sm text-xs" /></h4>
                                        <h4 className="text-black font-bold">{countProductQuantity}</h4>
                                        <h4 className="border-2 border-[#787878] bg-white lg:p-2 p-1 rounded-lg" onClick={handleIncreaseProduct}><FaPlus className="lg:text-sm text-xs" /></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-black lg:text-xl md:text-lg text-base font-bold">$250</h2>
                    </div>
                    <div className="flex items-center justify-between border-2 rounded-lg lg:p-5 md:p-4 p-3 shadow-lg">
                        <div className="flex items-center lg:gap-8 md:gap-5 gap-3">
                            <div className="lg:h-52 md:h-36 h-28 lg:w-48 md:w-32 w-24">
                                <img className="h-full w-full" src={product} alt="product" />
                            </div>
                            <div className="flex flex-col lg:gap-3 md:gap-2 gap-1">
                                <h4 className="text-black lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">ID:</span> 1111</h4>
                                <h4 className="text-black lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">Product Name:</span> Women Bardot Dress</h4>
                                {/* <h4>Product Name: Women Bardot Dress</h4> */}
                                <h4 className="text-black lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">Size:</span> M</h4>
                                <div className="flex items-center lg:gap-3 md:gap-2 gap-1">
                                    <p className="lg:text-lg md:text-base text-sm font-semibold">Quantity: </p>
                                    <div className="flex items-center lg:text-xl md:text-lg text-base font-semibold lg:gap-3 md:gap-[10px] gap-2">
                                        <h4 className="border-2 border-[#787878] bg-white lg:p-2 p-1 rounded-lg" onClick={handleDecreaseProduct}><FaMinus className="lg:text-sm text-xs" /></h4>
                                        <h4 className="text-black font-bold">{countProductQuantity}</h4>
                                        <h4 className="border-2 border-[#787878] bg-white lg:p-2 p-1 rounded-lg" onClick={handleIncreaseProduct}><FaPlus className="lg:text-sm text-xs" /></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-black lg:text-xl md:text-lg text-base font-bold">$250</h2>
                    </div>
                </div>
                {/* order summary */}
                <div className="lg:w-1/3 md:w-2/3 w-5/6 lg:mx-0 mx-auto border-2 rounded-xl lg:p-5 md:p-4 p-3 shadow-lg">
                    <h2 className="text-black font-semibold lg:text-3xl md:text-2xl text-xl">Order Details</h2>
                    <div className="lg:mt-10 md:mt-8 mt-6 flex flex-col lg:gap-4 md:gap-3 gap-2">
                        <div className="flex justify-between">
                            <p className="font-medium lg:text-lg md:text-base text-sm">Subtotal</p>
                            <p className="font-semibold lg:text-lg md:text-base text-sm">$250</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium lg:text-lg md:text-base text-sm">Estimated Shipping</p>
                            <p className="font-semibold lg:text-lg md:text-base text-sm">$5.90</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-medium lg:text-lg md:text-base text-sm">Shipping Discount</p>
                            <p className="font-semibold lg:text-lg md:text-base text-sm">- $5.90</p>
                        </div>
                        <div className="flex justify-between lg:pt-5 md:pt-4 pt-3 border-t-2">
                            <p className="font-semibold lg:text-2xl md:text-xl text-lg">Total</p>
                            <p className="font-bold lg:text-2xl md:text-xl text-lg">$250</p>
                        </div>
                    </div>
                    <button className="lg:mt-14 md:mt-12 mt-10 flex mx-auto justify-center md:py-2 py-[6px] lg:w-44 md:w-36 w-32 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800 shadow-lg">Checkout Now</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;