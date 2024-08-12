import { FaSearch } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight, FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../../helpers/axios/requestMethod";
import { addToWishlist, fetchWishlist, removeFromWishlist } from "../../../redux/api/wishlistCalls";
import Swal from "sweetalert2";
import { TiShoppingCart } from "react-icons/ti";


const MenProducts = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.user?.currentUser);
    const wishlistInfo = useSelector(state => state?.wishlist?.wishlist || []);

    // filter work
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (event) => {
        const selectedValue = event?.target?.value;
        setFilters({
            ...filters,
            [event?.target?.name]: selectedValue
        });
    };

    // console.log(filters);

    // product data show
    const [menProducts, setMenProducts] = useState([]);
    const [filteredMenProducts, setFilteredMenProducts] = useState([]);
    const category = "men";
    // for normal data show
    useEffect(() => {
        const getMenProducts = async () => {
            try {
                const res = await publicRequest.get(`/products?category=${category}`);
                // console.log(res?.data);
                setMenProducts(res?.data);
            } catch (error) {
                console.log(error)
            }
        };
        getMenProducts();
    }, [category]);

    // for filtered data show
    useEffect(() => {
        category && setFilteredMenProducts(
            menProducts.filter((product) =>
                Object.entries(filters).every(([key, value]) => (
                    product[key].includes(value)
                ))
            )
        )
    }, [menProducts, category, filters]);

    // for sort data show
    useEffect(() => {
        if (sort === "newest") {
            setFilteredMenProducts((prev) =>
                [...prev].sort((x, y) => new Date(y?.createdAt) - new Date(x?.createdAt))
            )
        } else if (sort === "asc") {
            setFilteredMenProducts((prev) =>
                [...prev].sort((x, y) => x?.price - y?.price)
            )
        } else {
            setFilteredMenProducts((prev) =>
                [...prev].sort((x, y) => y?.price - x?.price)
            )
        }
    }, [menProducts, sort, filters]);

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
    const currentItems = filteredMenProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage doesn't go below 1
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredMenProducts.length / itemsPerPage))); // Ensure currentPage doesn't exceed the total number of pages
    };

    const maxVisibleButtons = 5; // Maximum number of buttons to show at a time
    const totalPages = Math.ceil(filteredMenProducts.length / itemsPerPage);
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
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-purple-800">Men Fashion</h1> */}
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-800">Men Fashion</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">Men Fashion</h1> */}
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">From sophisticated suits and formal wear to casual shirts and jeans, our men's collection offers a variety of options to suit every style.</p>
            </div>

            {/* queries */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-800 lg:mt-12 md:mt-10 mt-7 lg:py-5 md:py-4 py-3 lg:px-6 md:px-5 px-4 flex lg:flex-row md:flex-wrap flex-col justify-between lg:items-center md:items-center items-end lg:gap-0 md:gap-y-4 gap-y-3">
                <div className="flex items-center lg:gap-3 md:gap-10 gap-10">
                    <h4 className="text-white lg:text-xl md:text-lg text-base font-semibold">Select Color:</h4>
                    <select className="lg:py-2 py-[6px] lg:px-4 md:px-3 px-2 lg:text-lg font-semibold rounded-lg lg:w-48 md:w-44 w-40" onChange={handleFilters} name="color">
                        <option disabled selected>Color</option>
                        <option value="blue">Blue</option>
                        <option value="pink">Pink</option>
                        <option value="gray">Gray</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                    </select>
                </div>
                <div className="flex items-center lg:gap-3 md:gap-12 gap-10">
                    <h4 className="text-white lg:text-xl md:text-lg text-base font-semibold">Select Size:</h4>
                    <select className="lg:py-2 py-[6px] lg:px-4 md:px-3 px-2 lg:text-lg font-semibold rounded-lg lg:w-48 md:w-44 w-40" onChange={handleFilters} name="size">
                        <option disabled selected>Size</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                    </select>
                </div>
                <div className="flex items-center lg:gap-3 md:gap-20 gap-10">
                    <h4 className="text-white lg:text-xl md:text-lg text-base font-semibold">Sort By:</h4>
                    <select className="lg:py-2 py-[6px] lg:px-4 md:px-3 px-2 lg:text-lg font-semibold rounded-lg lg:w-48 md:w-44 w-40" onChange={event => setSort(event?.target?.value)}>
                        <option value="newest">New Arrival</option>
                        <option value="asc">Price Low to High</option>
                        <option value="desc">Price High to Low</option>
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
                                        currentItems?.map((menProduct) => (
                                            <div key={menProduct?._id} className="relative group duration-500 transform hover:scale-105">
                                                <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-60 h-52 w-full shadow-lg" src={menProduct?.image} alt="men product image" />
                                                <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-2 md:gap-[6px] gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                                                    <Link to={`/product/${menProduct?._id}`}>
                                                        <TiShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                                                    </Link>
                                                    <Link to={`/product/${menProduct?._id}`}>
                                                        <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110" />
                                                    </Link>
                                                    {isProductInWishlist(menProduct?._id) ? (
                                                        <FaHeart
                                                            onClick={() => handleRemoveFromWishlist(menProduct?._id)}
                                                            className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-10 md:w-9 w-8 lg:h-10 md:h-9 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-110"
                                                        />
                                                    ) : (
                                                        <FaRegHeart
                                                            onClick={() => handleAddToWishlist(menProduct)}
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
        </div>
    );
};

export default MenProducts;