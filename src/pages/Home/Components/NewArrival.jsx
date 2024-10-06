import { useEffect, useState } from "react";
import { publicRequest } from "../../../helpers/axios/requestMethod";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const NewArrival = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]); // State to manage visible products
    const [showMore, setShowMore] = useState(false); // For toggling between "See More" and "See Less"

    // Fetch all products
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await publicRequest.get("/products");
                setAllProducts(res?.data || []); // Store all products
            } catch (error) {
                console.log(error);
            }
        };
        getAllProducts();
    }, []);

    // Filter new arrival products
    useEffect(() => {
        // Helper function to check if a product is a new arrival (within the last 30 days)
        const isNewArrival = (createdAt) => {
            const currentDate = new Date();
            const productDate = new Date(createdAt);
            const differenceInTime = currentDate - productDate;
            const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert time difference to days
            return differenceInDays <= 30; // Returns true if the product was created within the last 30 days
        };

        // Filter and sort new arrivals from all products
        const filteredNewArrivals = allProducts
            .filter((product) => isNewArrival(product?.createdAt)) // Filter products created in the last 30 days
            .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)); // Sort by newest first

        setNewArrivals(filteredNewArrivals); // Store filtered new arrivals
        setVisibleProducts(filteredNewArrivals.slice(0, 12)); // Initially show first 12 new arrivals
    }, [allProducts]);

    // Toggle between showing 12 products and all products
    const handleToggleProducts = () => {
        if (showMore) {
            // If currently showing all products, show only the first 12
            setVisibleProducts(newArrivals.slice(0, 12));
        } else {
            // If currently showing 12, show all products
            setVisibleProducts(newArrivals);
        }
        setShowMore(!showMore); // Toggle the showMore state
    };

    return (
        <>
            {
                visibleProducts?.length > 0 &&
                <div className="lg:px-20 md:px-12 px-6 lg:mt-20 md:mt-16 mt-14">
                    <div>
                        <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-black">New Arrival</h1>
                        <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Discover the latest must-have styles dress at Stylish Fashion, your next favorite outfit is here, fresh Off the runway and ready for You!</p>
                    </div>
                    <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 lg:gap-6 md:gap-5 gap-4 lg:mt-12 md:mt-10 mt-7">
                        {
                            visibleProducts?.map((product) => (
                                <div key={product?._id} className="relative group">
                                    <img className="border-2 border-purple-800 rounded-xl lg:h-56 md:h-48 h-40 w-full shadow-lg" src={product?.image} alt="product image" />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                                        <Link to={`/product/${product?._id}`}>
                                            <FaSearch className="bg-white border-2 border-purple-800 text-purple-800 rounded-full lg:w-11 md:w-10 w-9 lg:h-11 md:h-10 h-9 lg:p-3 md:p-[10px] p-2 duration-500 transform hover:scale-110" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button
                        onClick={handleToggleProducts}
                        className="bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-56 md:w-48 w-44 py-2 rounded-2xl lg:text-lg text-base font-semibold flex justify-center mx-auto lg:mt-14 md:mt-12 mt-10 items-center md:gap-2 gap-1"
                    >
                        {showMore ? 'See Less' : 'See More'} <MdArrowOutward className="lg:text-xl text-lg" />
                    </button>
                </div >
            }
        </>
    );
};

export default NewArrival;