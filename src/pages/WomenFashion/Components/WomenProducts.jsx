import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight, FaHeart, FaRegHeart } from "react-icons/fa6";
import product10 from "../../../assets/Images/Home/OurProducts_womenBardotDress.jpg";
import product11 from "../../../assets/Images/Home/OurProducts_womenFormal.jpg";
import product12 from "../../../assets/Images/Home/OurProducts_womenMaxiCutDress.jpg";
import product13 from "../../../assets/Images/Home/OurProducts_womenPantDress.jpg";
import product14 from "../../../assets/Images/Home/OurProducts_womenShiftDress.jpg";
import product15 from "../../../assets/Images/Home/OurProducts_womenSkirtDress.jpg";
import product16 from "../../../assets/Images/Home/OurProducts_womenTopDress.jpg";
import product17 from "../../../assets/Images/Home/OurProducts_womenWinterCap.jpg";
import product18 from "../../../assets/Images/Home/OurProducts_womenWinterCoatDress.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../../helpers/axios/requestMethod";
import { addToWishlist, fetchWishlist, removeFromWishlist } from "../../../redux/api/wishlistCalls";
import Swal from "sweetalert2";
import { TiShoppingCart } from "react-icons/ti";

const womenProductsData = [
    {
        id: 1,
        image: product10,
    },
    {
        id: 2,
        image: product12,
    },
    {
        id: 3,
        image: product13,
    },
    {
        id: 4,
        image: product14,
    },
    {
        id: 5,
        image: product15,
    },
    {
        id: 6,
        image: product16,
    },
    {
        id: 7,
        image: product17,
    },
    {
        id: 8,
        image: product18,
    },
    {
        id: 9,
        image: product10,
    },
    {
        id: 10,
        image: product11,
    },
    {
        id: 11,
        image: product11,
    },
    {
        id: 12,
        image: product12,
    },
    {
        id: 13,
        image: product13,
    },
    {
        id: 14,
        image: product14,
    },
    {
        id: 15,
        image: product15,
    },
    {
        id: 16,
        image: product16,
    },
    {
        id: 17,
        image: product17,
    },
    {
        id: 18,
        image: product18,
    },

];

const WomenProducts = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.user?.currentUser);
    const wishlistInfo = useSelector(state => state?.wishlist?.wishlist || []);

    // filter work
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (event) => {
        const selectedValue = event.target.value;
        setFilters({
            ...filters,
            [event.target.name]: selectedValue
        });
    };

    console.log(filters);

    // product data show
    const [womenProducts, setWomenProducts] = useState([]);
    const [filteredWomenProducts, setFilteredWomenProducts] = useState([]);
    const category = "women";
    // for normal data show
    useEffect(() => {
        const getWomenProducts = async () => {
            try {
                const res = await publicRequest.get(`/products?category=${category}`);
                console.log(res?.data);
                setWomenProducts(res?.data);
            } catch (error) {
                console.log(error)
            }
        };
        getWomenProducts();
    }, [category]);

    // for filtered data show
    useEffect(() => {
        category && setFilteredWomenProducts(
            womenProducts.filter((product) =>
                Object.entries(filters).every(([key, value]) => (
                    product[key].includes(value)
                ))
            )
        )
    }, [womenProducts, category, filters]);

    // for sort data show
    useEffect(() => {
        if (sort === "newest") {
            setFilteredWomenProducts((prev) =>
                [...prev].sort((x, y) => new Date(y?.createdAt) - new Date(x?.createdAt))
            )
        } else if (sort === "asc") {
            setFilteredWomenProducts((prev) =>
                [...prev].sort((x, y) => x?.price - y?.price)
            )
        } else {
            setFilteredWomenProducts((prev) =>
                [...prev].sort((x, y) => y?.price - x?.price)
            )
        }
    }, [womenProducts, sort, filters]);

    // Fetch wishlist when user is logged in
    useEffect(() => {
        if (currentUser?._id) {
            dispatch(fetchWishlist(currentUser?._id));
        }
    }, [currentUser, dispatch, wishlistInfo]);


    // Handle adding product to wishlist
    const handleAddToWishlist = async (product) => {
        if (currentUser?._id) {
            const wishlistInfo = {
                selectedProductId: product?._id,
                title: product?.title,
                desc: product?.desc,
                image: product?.image,
                price: product?.price,
            };
            try {
                const res = await dispatch(addToWishlist(currentUser?._id, wishlistInfo));
                if (res?.status === 'success') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Added to wishlist!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed to add to wishlist",
                    showConfirmButton: true,
                });
            }
        } else {
            alert("Please log in to add items to your wishlist.");
        }
    };

    // Handle removing product from wishlist
    const handleRemoveFromWishlist = async (productId) => {
        if (currentUser?._id) {
            try {
                const res = await dispatch(removeFromWishlist(currentUser?._id, productId));
                if (res?.status === 'success') {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Removed from wishlist!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed to remove from wishlist",
                    showConfirmButton: true,
                });
            }
        } else {
            alert("Please log in to remove items from your wishlist.");
        }
    };

    const isProductInWishlist = (productId) => {
        console.log("Wishlist:", wishlistInfo);
        // console.log("Type of wishlist:", typeof wishlistInfo);
        return Array.isArray(wishlistInfo) && wishlistInfo.some(item => item?.selectedProductId === productId);
    };

    // State to manage current page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Logic to calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredWomenProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage doesn't go below 1
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredWomenProducts.length / itemsPerPage))); // Ensure currentPage doesn't exceed the total number of pages
    };

    const maxVisibleButtons = 5; // Maximum number of buttons to show at a time
    const totalPages = Math.ceil(filteredWomenProducts.length / itemsPerPage);
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
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-800">Women Fashion</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">Women Fashion</h1> */}
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Browse through our stylish dresses, tops, skirts, and more, perfect for work, casual outings, and special events.</p>
            </div>

            {/* queries */}
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
            {
                currentItems?.length === 0 ?
                    <div>
                        <h2 className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-40 md:my-32 my-24 text-black text-center font-semibold">No product is available now!</h2>
                    </div> :
                    <>
                        {
                            currentItems?.length > 0 &&
                            <>
                                {/* products */}
                                <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-4 lg:mt-12 md:mt-10 mt-7">
                                    {
                                        currentItems?.map((womenProduct) => (
                                            <div key={womenProduct?._id} className="relative group duration-500 transform hover:scale-105">
                                                <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={womenProduct?.image} alt="men product image" />
                                                <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                                                    <Link to={`/product/${womenProduct?._id}`}>
                                                        <TiShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                                                    </Link>
                                                    <Link to={`/product/${womenProduct?._id}`}>
                                                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                                                    </Link>
                                                    {isProductInWishlist(womenProduct?._id) ? (
                                                        <FaHeart
                                                            onClick={() => handleRemoveFromWishlist(womenProduct?._id)}
                                                            className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110"
                                                        />
                                                    ) : (
                                                        <FaRegHeart
                                                            onClick={() => handleAddToWishlist(womenProduct)}
                                                            className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110"
                                                        />
                                                    )}
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
                            </>
                        }
                    </>
            }
            {/* <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-4 lg:mt-12 md:mt-10 mt-7">
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product10} alt="product10" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product11} alt="product11" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product12} alt="product12" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product13} alt="product13" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product14} alt="product14" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product15} alt="product6" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product16} alt="product16" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product17} alt="product17" />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                        <FaShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                        <FaRegHeart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                    </div>
                </div>
                <div className="relative group">
                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={product18} alt="product18" />
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

export default WomenProducts;