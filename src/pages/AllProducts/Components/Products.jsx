import { FaRegHeart, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { publicRequest } from "../../../helpers/axios/requestMethod";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { TiShoppingCart } from "react-icons/ti";
import { addToWishlist, fetchWishlist, removeFromWishlist } from "../../../redux/api/wishlistCalls";

const Products = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.user?.currentUser);
    const wishlistInfo = useSelector(state => state?.wishlist?.wishlist || []);
    const [allProducts, setAllProducts] = useState([]);

    // Fetch all products on mount
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await publicRequest.get("/products");
                setAllProducts(res?.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        getAllProducts();
    }, []);


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
        // console.log("Wishlist:", wishlistInfo);
        // console.log("Type of wishlist:", typeof wishlistInfo);
        return Array.isArray(wishlistInfo) && wishlistInfo.some(item => item?.selectedProductId === productId);
    };


    // State to manage current page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Logic to calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage doesn't go below 1
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(allProducts.length / itemsPerPage))); // Ensure currentPage doesn't exceed the total number of pages
    };

    const maxVisibleButtons = 5; // Maximum number of buttons to show at a time
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
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
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-800">All Products</h1>
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Discover the latest trends in men’s, women’s, and kids' wear. At Stylish Fashion, we offer a curated collection of stylish and affordable clothing to keep your wardrobe fresh and fashionable.</p>
            </div>
            <div>
                {
                    currentItems?.length === 0 ?
                        <div>
                            <h2 className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-40 md:my-32 my-24 text-black text-center font-semibold">No product is available now!</h2>
                        </div> :
                        <>
                            {
                                currentItems?.length > 0 &&
                                <>
                                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-4 lg:mt-12 md:mt-10 mt-7">
                                        {
                                            currentItems?.map((product) => (
                                                <div key={product?._id} className="relative group">
                                                    <img className="border-2 border-purple-800 rounded-xl lg:h-[350px] md:h-64 h-52 w-full shadow-lg" src={product?.image} alt="product image" />
                                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-[12px] md:gap-[10px] gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                                                        <Link to={`/product/${product?._id}`}>
                                                            <TiShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125" />
                                                        </Link>
                                                        <Link to={`/product/${product?._id}`}>
                                                            <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125" />
                                                        </Link>
                                                        {isProductInWishlist(product?._id) ? (
                                                            <FaHeart
                                                                onClick={() => handleRemoveFromWishlist(product?._id)}
                                                                className="icon-class bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
                                                            />
                                                        ) : (
                                                            <FaRegHeart
                                                                onClick={() => handleAddToWishlist(product)}
                                                                className="icon-class bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
                                                            />
                                                        )}
                                                        {/* {isInWishlist ? (
                                                        <FaHeart
                                                            onClick={() => handleRemoveFromWishlist(product?._id)}
                                                            className="bg-purple-800 border-2 border-purple-800 text-white rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
                                                        />
                                                    ) : (
                                                        <FaRegHeart
                                                            onClick={() => handleAddToWishlist(product)}
                                                            className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
                                                        />
                                                    )} */}
                                                        {/* {isProductInWishlist(product?._id) ? (
                                                        <FaHeart
                                                            onClick={() => handleRemoveFromWishlist(product?._id)}
                                                            className="bg-purple-800 border-2 border-purple-800 text-white rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
                                                        />
                                                    ) : (
                                                        <FaRegHeart
                                                            onClick={() => handleAddToWishlist(product)}
                                                            className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
                                                        />
                                                    )} */}



                                                        {/* <FaRegHeart onClick={() => handleAddToWishlist(product)} className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125" /> */}
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
                    // (
                    //     <>
                    //         {currentItems?.length > 0 && (
                    //             <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-4 lg:mt-12 md:mt-10 mt-7">
                    //                 {currentItems.map((product) => {
                    //                     const isInWishlist = wishlist.some((item) => item?.selectedProductId === product?._id);

                    //                     return (
                    //                         <div key={product?._id} className="relative group">
                    //                             <img className="border-2 border-purple-800 rounded-xl lg:h-[350px] md:h-64 h-52 w-full shadow-lg" src={product?.image} alt="product image" />
                    //                             <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-[12px] md:gap-[10px] gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                    //                                 <Link to={`/product/${product?._id}`}>
                    //                                     <TiShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125" />
                    //                                 </Link>
                    //                                 <Link to={`/product/${product?._id}`}>
                    //                                     <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125" />
                    //                                 </Link>
                    //                                 {isInWishlist ? (
                    //                                     <FaHeart
                    //                                         onClick={() => handleRemoveFromWishlist(product?._id)}
                    //                                         className="bg-purple-800 border-2 border-purple-800 text-white rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
                    //                                     />
                    //                                 ) : (
                    //                                     <FaRegHeart
                    //                                         onClick={() => handleAddToWishlist(product)}
                    //                                         className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
                    //                                     />
                    //                                 )}
                    //                             </div>
                    //                         </div>
                    //                     );
                    //                 })}
                    //             </div>
                    //         )}

                    //         {/* pagination */}
                    //         <div className="lg:mt-14 md:mt-12 mt-10">
                    //             <ul className="flex justify-center lg:space-x-4 md:space-x-3 space-x-2">
                    //                 {/* Render Previous button */}

                    //                 <button
                    //                     onClick={goToPreviousPage}
                    //                     disabled={currentPage === 1}
                    //                     className={`px-3 py-1 rounded-md focus:outline-none ${currentPage === 1 ? 'text-gray-500 cursor-default' : 'text-black'}`}
                    //                 >
                    //                     <FaAngleLeft />
                    //                 </button>


                    //                 {/* Render pagination buttons */}
                    //                 {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
                    //                     const pageNumber = startPage + index;
                    //                     return (
                    //                         <li key={pageNumber}>
                    //                             <button
                    //                                 onClick={() => paginate(pageNumber)}
                    //                                 className={`lg:w-10 md:w-9 w-8 lg:h-9 px-3 py-1 rounded-md font-medium focus:outline-none ${currentPage === pageNumber ? 'bg-purple-800 text-white' : 'bg-purple-200 text-black hover:bg-gray-300'}`}
                    //                             >
                    //                                 {pageNumber}
                    //                             </button>
                    //                         </li>
                    //                     );
                    //                 })}


                    //                 {/* Render Next button */}
                    //                 <button
                    //                     onClick={goToNextPage}
                    //                     disabled={currentPage === totalPages}
                    //                     className={`px-3 py-1 rounded-md focus:outline-none ${currentPage === totalPages ? 'text-gray-500 cursor-default' : 'text-black'}`}
                    //                 >
                    //                     <FaAngleRight />
                    //                 </button>

                    //             </ul>
                    //         </div>
                    //     </>
                    // )
                }
            </div>
        </div >
    );
};

export default Products;
// {/* <>
//     {
//         currentItems?.length > 0 &&
//         <>
//             <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-4 lg:mt-12 md:mt-10 mt-7">
//                 {
//                     currentItems?.map((product) => (
//                         <div key={product?._id} className="relative group">
//                             <img className="border-2 border-purple-800 rounded-xl lg:h-[350px] md:h-64 h-52 w-full shadow-lg" src={product?.image} alt="product image" />
//                             <div className="absolute inset-0 bg-black bg-opacity-30 flex md:flex-row flex-col items-center justify-center lg:gap-[12px] md:gap-[10px] gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
//                                 <Link to={`/product/${product?._id}`}>
//                                     <TiShoppingCart className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125" />
//                                 </Link>
//                                 <Link to={`/product/${product?._id}`}>
//                                     <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125" />
//                                 </Link>
//                                 {isInWishlist ? (
//                                     <FaHeart
//                                         onClick={() => handleRemoveFromWishlist(product?._id)}
//                                         className="bg-purple-800 border-2 border-purple-800 text-white rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
//                                     />
//                                 ) : (
//                                     <FaRegHeart
//                                         onClick={() => handleAddToWishlist(product)}
//                                         className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
//                                     />
//                                 )}
//                                 {/* {isInWishlist ? (
//                                     <FaHeart
//                                         onClick={() => handleRemoveFromWishlist(product?._id)}
//                                         className="bg-purple-800 border-2 border-purple-800 text-white rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
//                                     />
//                                 ) : (
//                                     <FaRegHeart
//                                         onClick={() => handleAddToWishlist(product)}
//                                         className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
//                                     />
//                                 )} */}
//                                 {/* {isProductInWishlist(product?._id) ? (
//                                     <FaHeart
//                                         onClick={() => handleRemoveFromWishlist(product?._id)}
//                                         className="bg-purple-800 border-2 border-purple-800 text-white rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
//                                     />
//                                 ) : (
//                                     <FaRegHeart
//                                         onClick={() => handleAddToWishlist(product)}
//                                         className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125"
//                                     />
//                                 )} */}



//                                 {/* <FaRegHeart onClick={() => handleAddToWishlist(product)} className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-12 md:w-10 w-8 lg:h-12 md:h-10 h-8 lg:p-[10px] md:p-2 p-[6px] duration-500 transform hover:scale-125" /> */}
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//             {/* pagination */}
//             <div className="lg:mt-14 md:mt-12 mt-10">
//                 <ul className="flex justify-center lg:space-x-4 md:space-x-3 space-x-2">
//                     {/* Render Previous button */}

//                     <button
//                         onClick={goToPreviousPage}
//                         disabled={currentPage === 1}
//                         className={`px-3 py-1 rounded-md focus:outline-none ${currentPage === 1 ? 'text-gray-500 cursor-default' : 'text-black'}`}
//                     >
//                         <FaAngleLeft />
//                     </button>


//                     {/* Render pagination buttons */}
//                     {Array.from({ length: endPage - startPage + 1 }).map((_, index) => {
//                         const pageNumber = startPage + index;
//                         return (
//                             <li key={pageNumber}>
//                                 <button
//                                     onClick={() => paginate(pageNumber)}
//                                     className={`lg:w-10 md:w-9 w-8 lg:h-9 px-3 py-1 rounded-md font-medium focus:outline-none ${currentPage === pageNumber ? 'bg-purple-800 text-white' : 'bg-purple-200 text-black hover:bg-gray-300'}`}
//                                 >
//                                     {pageNumber}
//                                 </button>
//                             </li>
//                         );
//                     })}


//                     {/* Render Next button */}
//                     <button
//                         onClick={goToNextPage}
//                         disabled={currentPage === totalPages}
//                         className={`px-3 py-1 rounded-md focus:outline-none ${currentPage === totalPages ? 'text-gray-500 cursor-default' : 'text-black'}`}
//                     >
//                         <FaAngleRight />
//                     </button>

//                 </ul>
//             </div>
//         </>
//     }
// </> */}