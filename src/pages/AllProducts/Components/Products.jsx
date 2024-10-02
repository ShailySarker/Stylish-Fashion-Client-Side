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
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        sortBy: '', // Change to a string to hold only one sorting option
        category: [],
        subCategory: [],
        occasion: [],
    });

    // Fetch all products on mount
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                setLoading(true);
                const res = await publicRequest.get("/products");
                // setAllProducts(res?.data);
                setAllProducts(res?.data || []);
                setFilteredProducts(res?.data || []); // Initialize filteredProducts with all products
            } catch (error) {
                setError("Failed to fetch users");
            } finally {
                setLoading(false);
            }
        };
        getAllProducts();
    }, []);
    // console.log(allProducts)

    // Handle filter change for sorting
    const handleSortChange = (value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            sortBy: prevFilters.sortBy === value ? '' : value, // Toggle the sorting option, or uncheck if already selected
        }));
    };
    // Handle filter change for categories
    const handleCategoryChange = (value) => {
        setSelectedFilters((prevFilters) => {
            const newCategories = prevFilters?.category.includes(value)
                ? prevFilters?.category.filter((item) => item !== value)
                : [...prevFilters.category, value];
            return { ...prevFilters, category: newCategories };
        });
    };
    // Handle filter change for sub categories
    const handleSubCategoryChange = (value) => {
        setSelectedFilters((prevFilters) => {
            const newCategories = prevFilters?.subCategory.includes(value)
                ? prevFilters?.subCategory.filter((item) => item !== value)
                : [...prevFilters.subCategory, value];
            return { ...prevFilters, subCategory: newCategories };
        });
    };
    // Handle filter change for occasion
    const handleOccasionChange = (value) => {
        setSelectedFilters((prevFilters) => {
            const newCategories = prevFilters?.occasion.includes(value)
                ? prevFilters?.occasion.filter((item) => item !== value)
                : [...prevFilters.occasion, value];
            return { ...prevFilters, occasion: newCategories };
        });
    };

    useEffect(() => {
        let filtered = [...allProducts];

        // Apply Category Filter
        if (selectedFilters?.category?.length > 0) {
            filtered = filtered.filter((product) =>
                selectedFilters?.category.includes(product?.category)
            );
        }
        // Apply subCategory Filter
        if (selectedFilters?.subCategory?.length > 0) {
            filtered = filtered.filter((product) =>
                selectedFilters?.subCategory.includes(product?.subCategory)
            );
        }
        // Apply occasion Filter
        if (selectedFilters?.occasion?.length > 0) {
            filtered = filtered.filter((product) =>
                selectedFilters?.occasion.includes(product?.occasion)
            );
        }

        // Helper function to check if a product is a new arrival (within last 30 days)
        const isNewArrival = (createdAt) => {
            const currentDate = new Date();
            const productDate = new Date(createdAt);
            const differenceInTime = currentDate - productDate;
            const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert time difference to days
            return differenceInDays <= 30; // Returns true if the product was created within the last 30 days
        };

        // Apply Sort By Filter
        if (selectedFilters?.sortBy === 'Price Low to High') {
            filtered = [...filtered].sort((a, b) => a?.price - b?.price); // Sort by ascending price
        } else if (selectedFilters?.sortBy === 'Price High to Low') {
            filtered = [...filtered].sort((a, b) => b?.price - a?.price); // Sort by descending price
        } else if (selectedFilters?.sortBy === 'New Arrival') {
            // Filter by new arrivals based on createdAt and sort by createdAt in descending order
            filtered = filtered
                .filter((product) => isNewArrival(product?.createdAt))
                .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)); // Sort by newest arrival first
        }

        setFilteredProducts(filtered);

    }, [selectedFilters, allProducts]);

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
    const itemsPerPage = 16;

    // Logic to calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = allProducts.slice(indexOfFirstItem, indexOfLastItem);
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure currentPage doesn't go below 1
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(allProducts.length / itemsPerPage))); // Ensure currentPage doesn't exceed the total number of pages
    };

    const maxVisibleButtons = 5; // Maximum number of buttons to show at a time
    // const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
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
                    error && <p className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-44 md:my-36 my-28 text-black text-center font-semibold">{error}</p>
                }
                {
                    loading ?
                        (
                            <p className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-44 md:my-36 my-28 text-black text-center font-semibold">Loading...</p>
                        ) : (
                            currentItems?.length > 0 ?
                                (
                                    <div className="flex gap-12 lg:mt-12 md:mt-10 mt-7">
                                        {/* filtering options */}
                                        <div className="w-[30%] flex flex-col gap-6">
                                            {/* Sort By */}
                                            <div>
                                                <h4 className="font-bold">Sort By</h4>
                                                <div className="mt-3 flex flex-wrap items-center gap-4 font-medium text-black">
                                                    <div className="flex flex-row gap-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedFilters.sortBy === 'New Arrival'}
                                                            onChange={() => handleSortChange('New Arrival')}
                                                        />
                                                        <p>New Arrival</p>
                                                    </div>
                                                    <div className="flex flex-row gap-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedFilters.sortBy === 'Price Low to High'}
                                                            onChange={() => handleSortChange('Price Low to High')}
                                                        />
                                                        <p>Price Low to High</p>
                                                    </div>
                                                    <div className="flex flex-row gap-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedFilters.sortBy === 'Price High to Low'}
                                                            onChange={() => handleSortChange('Price High to Low')}
                                                        />
                                                        <p>Price High to Low</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* category */}
                                            <div>
                                                <h4 className="font-bold">Category</h4>
                                                <div className="mt-3 flex items-center gap-4 font-medium text-black">
                                                    <div className="flex flex-row gap-1">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleCategoryChange("Men")}
                                                        />
                                                        <p>Men</p>
                                                    </div>
                                                    <div className="flex flex-row gap-1">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleCategoryChange("Women")}
                                                        />
                                                        <p>Women</p>
                                                    </div>
                                                    <div className="flex flex-row gap-1">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleCategoryChange("Kids")}
                                                        />
                                                        <p>Kids</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* sub category */}
                                            <div>
                                                <h4 className="font-bold">Sub-Category</h4>
                                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-medium text-black">
                                                    <div className="flex flex-row  gap-1">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Cap")}
                                                        />
                                                        <p>Cap</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Coat")}
                                                        />
                                                        <p>Coat</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Hudi")}
                                                        />
                                                        <p>Hudi</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Jacket")}
                                                        />
                                                        <p>Jacket</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Pant")}
                                                        />
                                                        <p>Pant</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Shirt")}
                                                        />
                                                        <p>Shirt</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Shorts")}
                                                        />
                                                        <p>Shorts</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Suit")}
                                                        />
                                                        <p>Suit</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Tshirt")}
                                                        />
                                                        <p>Tshirt</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Frog")}
                                                        />
                                                        <p>Frog</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Plazzo")}
                                                        />
                                                        <p>Plazzo</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Bardot")}
                                                        />
                                                        <p>Bardot</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Formal")}
                                                        />
                                                        <p>Formal</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Top")}
                                                        />
                                                        <p>Top</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("TopSkirtSet")}
                                                        />
                                                        <p>Top Skirt Set</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("TopPantSet")}
                                                        />
                                                        <p>Top Pant Set</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("TshirtPantSet")}
                                                        />
                                                        <p>Tshirt Pant Set</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("WinterDressSet")}
                                                        />
                                                        <p>Winter Dress Set</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox"
                                                            onChange={() => handleSubCategoryChange("Other")}
                                                        />
                                                        <p>Other</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Occasion */}
                                            <div>
                                                <h4 className="font-bold">Occasion</h4>
                                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-medium text-black">
                                                    <div className="flex flex-row  gap-1">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleOccasionChange("Formal")}
                                                        />
                                                        <p>Formal</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleOccasionChange("Clausal")}
                                                        />
                                                        <p>Clausal</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleOccasionChange("Party")}
                                                        />
                                                        <p>Party</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleOccasionChange("Wedding")}
                                                        />
                                                        <p>Wedding</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleOccasionChange("Other")}
                                                        />
                                                        <p>Other</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Session */}
                                            <div>
                                                <h4 className="font-bold">Session</h4>
                                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-medium text-black">
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="occasion" id="" />
                                                        <p>Summer</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="occasion" id="" />
                                                        <p>Rainy</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="occasion" id="" />
                                                        <p>Autumn</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="occasion" id="" />
                                                        <p>Winter</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="occasion" id="" />
                                                        <p>Other</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Brand */}
                                            <div>
                                                <h4 className="font-bold">Brand</h4>
                                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-medium text-black">
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Zara</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Levls</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Gucci</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Oshkosh B gosh</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Polo Ralph Lauren</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Nordstorm</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>H&M</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Boss Hugo Boss</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Gymboree</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Mini Boden</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Carters</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Tea</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Uni Qlo</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>The Children's Place</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>Tommy Hilfighter</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="brand" id="" />
                                                        <p>J Crew</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Size */}
                                            <div>
                                                <h4 className="font-bold">Size</h4>
                                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-medium text-black">
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="size" id="" />
                                                        <p>XS</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="size" id="" />
                                                        <p>S</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="size" id="" />
                                                        <p>M</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="size" id="" />
                                                        <p>L</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="size" id="" />
                                                        <p>XL</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="size" id="" />
                                                        <p>2XL</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Color */}
                                            <div>
                                                <h4 className="font-bold">Color</h4>
                                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-medium text-black">
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Red</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#dc2626]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Green</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#16a34a]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Blue</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#1d4ed8]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Pink</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#db2777]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Purple</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#9333ea]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Black</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#000000]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>White</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#ffffff]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Indigo</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#4f46e5]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Teal</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#14b8a6]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Gray</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#9ca3af]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Peach</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#fecdd3]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Yellow</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#facc15]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Orange</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#f97316]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Sky</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#38bdf8]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Brown</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#78350f]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Olive</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#3f6212]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Amber</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#d97706]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Lemon</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#a3e635]"></span>
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="color" id="" />
                                                        <p className="flex flex-row items-center gap-1">
                                                            <span>Magenta</span>
                                                            <span className="w-4 h-4 rounded-full bg-[#e11d48]"></span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Price */}
                                            <div>
                                                <h4 className="font-bold">Price</h4>
                                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-medium text-black">
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="price" id="" />
                                                        <p>Less than $100</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="price" id="" />
                                                        <p>$100 - $199</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="price" id="" />
                                                        <p>$200 - $299</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="price" id="" />
                                                        <p>$300 - $399</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="price" id="" />
                                                        <p>$400 - $499</p>
                                                    </div>
                                                    <div className="flex flex-row  gap-1">
                                                        <input type="checkbox" name="price" id="" />
                                                        <p>Greater than $500 </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-[70%]">
                                            {/* Products display */}
                                            {loading && <p>Loading...</p>}
                                            {error && <p>{error}</p>}
                                            {currentItems?.length > 0 ? (
                                                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-4">
                                                    {currentItems?.map((product) => (
                                                        <div key={product?._id} className="relative group">
                                                            <img
                                                                className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-64 h-52 w-full shadow-lg"
                                                                src={product?.image}
                                                                alt="product"
                                                            />
                                                            {/* Hover icons and wishlist logic */}
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
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div>
                                                    <h2 className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-44 md:my-36 my-28 text-black text-center font-semibold">No products found based on selected filters.</h2>
                                                </div>
                                            )}

                                            {/* products */}
                                            {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-5 gap-4 ">
                                                        {
                                                            currentItems?.map((product) => (
                                                                <div key={product?._id} className="relative group">
                                                                    <img className="border-2 border-purple-800 rounded-xl lg:h-72 md:h-64 h-52 w-full shadow-lg" src={product?.image} alt="product image" />
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
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div> */}
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
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-44 md:my-36 my-28 text-black text-center font-semibold">No product is available now!</h2>
                                    </div>
                                )
                        )

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