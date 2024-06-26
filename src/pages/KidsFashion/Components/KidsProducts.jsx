import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import product19 from "../../../assets/Images/Home/OurProducts_boyCap.jpg";
import product20 from "../../../assets/Images/Home/OurProducts_boySuit.jpg";
import product21 from "../../../assets/Images/Home/OurProducts_boyTshirtSet.jpg";
import product22 from "../../../assets/Images/Home/OurProducts_boyWinterDress.jpg";
import product23 from "../../../assets/Images/Home/OurProducts_girlCap.jpg";
import product24 from "../../../assets/Images/Home/OurProducts_girlFrog.jpg";
import product25 from "../../../assets/Images/Home/OurProducts_girlSkirtSet.jpg";
import product26 from "../../../assets/Images/Home/OurProducts_girlWinterDress.jpg";

const KidsProducts = () => {
    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-800">Kids Fashion</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">Kids Fashion</h1> */}
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Discover our cute and comfortable clothing for boys and girls, designed to keep your little ones looking trendy and feeling great.</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-800 lg:mt-12 md:mt-10 mt-7 lg:py-5 md:py-4 py-3 lg:px-6 md:px-5 px-4 flex lg:flex-row flex-wrap justify-between items-center lg:gap-0 md:gap-y-4 gap-y-3">
                <div className="flex items-center lg:gap-3 md:gap-3 gap-3">
                    <h4 className="text-white lg:text-xl md:text-lg text-base font-semibold">Select Color:</h4>
                    <select className="lg:py-2 py-[6px] lg:px-4 md:px-3 px-2 lg:text-lg font-semibold rounded-lg lg:w-48 md:w-44 w-40">
                        <option disabled selected>Color</option>
                        <option value="">Blue</option>
                        <option value="">Pink</option>
                        <option value="">Gray</option>
                        <option value="">Black</option>
                        <option value="">White</option>
                        <option value="">Red</option>
                        <option value="">Yellow</option>
                        <option value="">Green</option>
                        <option value="">Orange</option>
                    </select>
                </div>
                <div className="flex items-center lg:gap-3 md:gap-3 gap-3">
                    <h4 className="text-white lg:text-xl md:text-lg text-base font-semibold">Select Size:</h4>
                    <select className="lg:py-2 py-[6px] lg:px-4 md:px-3 px-2 lg:text-lg font-semibold rounded-lg lg:w-48 md:w-44 w-40">
                        <option disabled selected>Size</option>
                        <option value="">XS</option>
                        <option value="">S</option>
                        <option value="">M</option>
                        <option value="">L</option>
                        <option value="">XL</option>
                        <option value="">2XL</option>
                    </select>
                </div>
                <div className="flex items-center lg:gap-3 md:gap-3 gap-3">
                    <h4 className="text-white lg:text-xl md:text-lg text-base font-semibold">Sort By:</h4>
                    <select className="lg:py-2 py-[6px] lg:px-4 md:px-3 px-2 lg:text-lg font-semibold rounded-lg lg:w-48 md:w-44 w-40">
                        <option selected>New Arrival</option>
                        <option value="">Price Low to High</option>
                        <option value="">Price High to Low</option>
                    </select>
                </div>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-4 lg:mt-12 md:mt-10 mt-7">
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product19} alt="product19" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product20} alt="product20" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product21} alt="product21" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product22} alt="product22" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product23} alt="product23" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product24} alt="product26" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product25} alt="product25" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product26} alt="product26" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default KidsProducts;