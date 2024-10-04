import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../redux/api/wishlistCalls";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const Wishlist = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.user?.currentUser);
    const wishlistInfo = useSelector(state => state?.wishlist?.wishlist);
    const isLoading = useSelector(state => state?.wishlist?.isLoading);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(fetchWishlist(currentUser?._id));
        }
    }, [currentUser, dispatch, wishlistInfo]);

    const handleDeleteProduct = async (productId) => {
        if (currentUser?._id) {
            try {
                const res = await dispatch(removeFromWishlist(currentUser._id, productId));
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

    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-black">My Wishlist</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Wishlist</h1> */}
            </div>
            <div className=" lg:gap-3 md:gap-9 gap-7 lg:mt-12 md:mt-10 mt-6 lg:max-h-[520px] md:max-h-[540px] max-h-[580px] overflow-y-auto">
                {
                    isLoading ?
                        <Loader /> :
                        <>
                            {
                                wishlistInfo.length > 0 ?
                                    <div className="flex flex-col lg:gap-4 md:gap-3 gap-2">
                                        {
                                            wishlistInfo?.map((product, index) => (
                                                <div key={product?.selectedProductId} className={`flex lg:flex-row flex-col lg:p-4 md:p-3 p-2 shadow-md border-2 border-purple-800 rounded-lg ${index % 2 === 0 ? 'bg-purple-200' : 'bg-white'}`}                                                >
                                                    <div className="flex justify-between w-full">
                                                        <div className="flex md:flex-row flex-col justify-between items-center lg:w-[96%] md:w-[94%]">
                                                            <div className="flex items-center lg:gap-4 md:gap-3 gap-2 ">
                                                                <div className="lg:h-44 md:h-36 h-28 lg:w-36 md:w-28 w-24">
                                                                    <img className="h-full w-full" src={product?.image} alt="product" />
                                                                </div>
                                                                <div className="lg:text-lg md:text-base text-sm font-medium flex flex-col lg:gap-3 md:gap-2 gap-[2px]">
                                                                    <p><span className="font-semibold text-purple-800">Product ID:</span> {product?.selectedProductId}</p>
                                                                    <p><span className="font-semibold text-purple-800">Name:</span> {product?.title}</p>
                                                                    <p className="font-bold"><span className="font-semibold text-purple-800">Price:</span> ${product?.price}</p>
                                                                    {/* <p>{product?.desc}</p> */}
                                                                    <div className="md:hidden visible mt-1">
                                                                        <Link to={`/product/${product?.selectedProductId}`}>
                                                                            <button className="lg:py-2 py-1 lg:w-40 md:w-28 w-28 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800">Show Details</button>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="md:block hidden">
                                                                <Link to={`/product/${product?.selectedProductId}`}>
                                                                    <button className="lg:py-2 py-1 lg:w-40 md:w-32 w-28 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800">Show Details</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <FaXmark onClick={() => handleDeleteProduct(product?.selectedProductId)} className="lg:text-2xl md:text-2xl text-xl md:p-1 p-[2px] bg-purple-800 rounded-full text-white" />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div> :
                                    <div>
                                        <div className="w-full">
                                            <h2 className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-40 md:my-28 my-20 text-black text-center font-semibold">No product is added into wishlist!</h2>
                                        </div>
                                    </div>
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default Wishlist;