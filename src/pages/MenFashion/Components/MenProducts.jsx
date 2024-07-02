import { FaSearch, FaShoppingCart } from "react-icons/fa";
import product1 from "../../../assets/Images/MenFashion/MenProducts_menCap.jpg";
import product2 from "../../../assets/Images/MenFashion/MenProducts_menHudi.jpg";
import product3 from "../../../assets/Images/MenFashion/MenProducts_menJacket.jpg";
import product4 from "../../../assets/Images/MenFashion/MenProducts_menPant.jpg";
import product5 from "../../../assets/Images/MenFashion/MenProducts_menShirt.jpg";
import product6 from "../../../assets/Images/MenFashion/MenProducts_menShorts.jpg";
import product7 from "../../../assets/Images/MenFashion/MenProducts_menSuit.jpg";
import product8 from "../../../assets/Images/MenFashion/MenProducts_menTshirt.jpg";
import product9 from "../../../assets/Images/MenFashion/MenProducts_menWinterCoat.jpg";
import { FaAngleLeft, FaAngleRight, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const menProductsData = [
    {
        id: 1,
        image: product1,
    },
    {
        id: 2,
        image: product2,
    },
    {
        id: 3,
        image: product3,
    },
    {
        id: 4,
        image: product4,
    },
    {
        id: 5,
        image: product5,
    },
    {
        id: 6,
        image: product6,
    },
    {
        id: 7,
        image: product7,
    },
    {
        id: 8,
        image: product8,
    },
    {
        id: 9,
        image: product9,
    },
    {
        id: 10,
        image: product1,
    },
    {
        id: 11,
        image: product1,
    },
    {
        id: 12,
        image: product2,
    },
    {
        id: 13,
        image: product3,
    },
    {
        id: 14,
        image: product4,
    },
    {
        id: 15,
        image: product5,
    },
    {
        id: 16,
        image: product6,
    },
    {
        id: 17,
        image: product7,
    },
    {
        id: 18,
        image: product8,
    },
    {
        id: 19,
        image: product9,
    },

];


const MenProducts = () => {
    // State to manage current page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Logic to calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = menProductsData.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage doesn't go below 1
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(menProductsData.length / itemsPerPage))); // Ensure currentPage doesn't exceed the total number of pages
    };

    const maxVisibleButtons = 5; // Maximum number of buttons to show at a time
    const totalPages = Math.ceil(menProductsData.length / itemsPerPage);
    let startPage, endPage;

    if (totalPages <= maxVisibleButtons) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= Math.floor(maxVisibleButtons / 2)) {
            startPage = 1;
            endPage = maxVisibleButtons;
        } else if (currentPage + Math.floor(maxVisibleButtons / 2) >= totalPages) {
            startPage = totalPages - maxVisibleButtons + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(maxVisibleButtons / 2);
            endPage = currentPage + Math.floor(maxVisibleButtons / 2);
        }
    }

    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-800">Men Fashion</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">Men Fashion</h1> */}
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">From sophisticated suits and formal wear to casual shirts and jeans, our men's collection offers a variety of options to suit every style.</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-800 lg:mt-12 md:mt-10 mt-7 lg:py-5 md:py-4 py-3 lg:px-6 md:px-5 px-4 flex lg:flex-row md:flex-wrap flex-col justify-between lg:items-center md:items-center items-end lg:gap-0 md:gap-y-4 gap-y-3">
                <div className="flex items-center lg:gap-3 md:gap-10 gap-10">
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
                <div className="flex items-center lg:gap-3 md:gap-12 gap-10">
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
                <div className="flex items-center lg:gap-3 md:gap-20 gap-10">
                    <h4 className="text-white lg:text-xl md:text-lg text-base font-semibold">Sort By:</h4>
                    <select className="lg:py-2 py-[6px] lg:px-4 md:px-3 px-2 lg:text-lg font-semibold rounded-lg lg:w-48 md:w-44 w-40">
                        <option selected>New Arrival</option>
                        <option value="">Price Low to High</option>
                        <option value="">Price High to Low</option>
                    </select>
                </div>
            </div>

            {/* products */}
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-4 lg:mt-12 md:mt-10 mt-7">
                {
                    currentItems?.map((menProduct) => (
                        <div key={menProduct?.id} className="relative group duration-500 transform hover:scale-105">
                            <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={menProduct?.image} alt="men product image" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                                <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                                <Link to="/singleProductDetails">
                                    <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                                </Link>
                                <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* pagination */}
            <div className="lg:mt-14 md:mt-12 mt-10">
                <ul className="flex justify-center lg:space-x-4 md:space-x-3 space-x-2">
                    {/* Render Previous button */}

                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md focus:outline-none ${currentPage === 1 ? 'text-gray-500 cursor-default' : 'text-black'}`}
                    >
                        <FaAngleLeft />
                    </button>

                    {/* Render pagination buttons */}
                    {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
                        const pageNumber = startPage + index;
                        return (
                            <li key={pageNumber}>
                                <button
                                    onClick={() => paginate(pageNumber)}
                                    className={`lg:w-10 md:w-9 w-8 lg:h-9 px-3 py-1 rounded-md font-medium focus:outline-none ${currentPage === pageNumber ? 'bg-purple-800 text-white' : 'bg-purple-200 text-black hover:bg-gray-300'}`}
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        );
                    })}

                    {/* Render Next button */}
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md focus:outline-none ${currentPage === totalPages ? 'text-gray-500 cursor-default' : 'text-black'}`}
                    >
                        <FaAngleRight />
                    </button>

                </ul>
            </div>
            {/* <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-4 lg:mt-12 md:mt-10 mt-7">
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product1} alt="product1" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <Link to="/singleProductDetails">
                            <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        </Link>
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product2} alt="product2" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product3} alt="product3" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product4} alt="product4" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product5} alt="product5" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product6} alt="product6" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product7} alt="product7" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product8} alt="product8" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product9} alt="product9" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default MenProducts;