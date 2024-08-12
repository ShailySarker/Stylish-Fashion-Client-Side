import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../redux/api/wishlistCalls";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.user?.currentUser);
    const wishlistInfo = useSelector(state => state?.wishlist?.wishlist);
    const isLoading = useSelector(state => state?.wishlist?.isLoading);
    const error = useSelector(state => state?.wishlist?.error);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(fetchWishlist(currentUser?._id));
        }
    }, [currentUser, dispatch]);
    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Wishlist</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Selecting Product</h1> */}
                <p className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-48 md:my-40 my-32 text-black text-center font-semibold">Coming Soon!</p>

            </div>
            <div>
                {
                    isLoading ?
                        <Loader /> :
                        <>
                            {
                                wishlistInfo.length > 0 ?
                                    <div>
                                        {
                                            wishlistInfo?.map(product => (
                                                <div key={product?._id}>
                                                    <div>
                                                        <div>
                                                            <img src={product?.image} alt="" />
                                                            <div>
                                                                <p>{product?.title}</p>
                                                                <p>{product?.price}</p>
                                                                <p>{product?._id}</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Link to={`/product/${product?._id}`}>
                                                                <button>Show Details</button>
                                                            </Link>
                                                        </div>
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