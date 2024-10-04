import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../../helpers/axios/requestMethod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cartRedux";
import { deleteAllProductsFromCart, deleteProductFromCart, fetchCart } from "../../redux/api/cartCalls";

const Cart = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.user?.currentUser);
    const { isLoading, error } = useSelector((state) => state?.cart);
    const cartInfo = useSelector((state) => state?.cart);
    // console.log(cartInfo)
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const Stripe_Key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    // Log the current user ID
    useEffect(() => {
        if (currentUser?._id) {
            // console.log("Current User ID:", currentUser?._id);
            dispatch(fetchCart(currentUser?._id));
        }
    }, [currentUser?._id, dispatch]);

    // delete cart product
    const handleDeleteProduct = (cartItemId) => {
        // dispatch(deleteProduct({ cartItemId }));
        try {

            if (currentUser && currentUser?._id) {
                // Dispatch the action to delete the product
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(deleteProductFromCart(currentUser?._id, cartItemId));
                        Swal.fire({
                            title: "Deleted!",
                            text: "The product has been deleted.",
                            icon: "success"
                        });
                    }
                });
            } else {
                alert("User not authenticated.");
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to remove product from cart",
                text: error.response?.data?.message || "There was an error deleting the product from the cart.",
                showConfirmButton: true,
            });
        }
    };

    const handleToken = (token) => {
        // console.log("Stripe Token:", token);
        setStripeToken(token);
    };

    // handling payment
    const makePaymentRequest = async (token, cartInfo) => {
        try {
            // console.log("Sending payment request to backend");

            const amount = Math.round(
                (cartInfo?.subTotal +
                    (cartInfo?.cartQuantity * 5) +
                    parseFloat((cartInfo?.subTotal * 0.05).toFixed(2)))
            );
            // console.log(amount)
            // payment info
            const res = await userRequest.post("/checkout/payment", {
                tokenId: token?.id,
                amount: amount,
                // amount: ((cartInfo?.subTotal + (cartInfo?.cartQuantity * 5) + parseFloat((cartInfo?.subTotal * 0.05).toFixed(2))) * 100),
            });
            // console.log("Payment Response:", res?.data);

            if (res?.data?.status === "succeeded") {
                // order info
                const orderInfo = {
                    userId: currentUser?._id, // Ensure userId is correctly set
                    products: cartInfo?.products,
                    amount: res?.data?.amount,
                    address: {
                        billingAddress: {
                            username: res?.data?.billing_details?.name,
                            address: res?.data?.billing_details?.address?.line1,
                            city: res?.data?.billing_details?.address?.city,
                            postcode: res?.data?.billing_details?.address?.postal_code,
                            country: res?.data?.billing_details?.address?.country
                        },
                        shippingAddress: {
                            username: res?.data?.billing_details?.name,
                            address: res?.data?.source?.address_line1,
                            city: res?.data?.source?.address_city,
                            postcode: res?.data?.source?.address_zip,
                            country: res?.data?.source?.address_country,
                        }
                    },
                    status: "pending",

                };
                // console.log(orderInfo);
                // Call the order post API
                const orderRes = await userRequest.post("/orders", orderInfo);
                // console.log("Order Response:", orderRes?.data);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Payment is successful!",
                    showConfirmButton: false,
                    timer: 3000,
                });

                // clear all cart info for current user
                deleteAllProductsFromCart(currentUser?._id);
                dispatch(clearCart()); // Clear cart redux after successful payment
                navigate("/orderTracking");
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Payment failed!",
                    text: "The payment could not be processed.",
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            console.error("Payment Error:", error);

            Swal.fire({
                position: "center",
                icon: "error",
                title: "Payment failed!",
                text: error.response?.data?.message || error?.message,
                showConfirmButton: true,
            });
        }
    };

    useEffect(() => {
        if (stripeToken) {
            makePaymentRequest(stripeToken, cartInfo);
        }
    }, [stripeToken]);

    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-black">My Cart</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl//normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Cart</h1> */}
            </div>
            {/* <div className="flex justify-between items-start lg:mt-16 md:mt-10 mt-8">
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
            </div> */}
            <div>
                {/* product Details */}
                {
                    error && <p className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-44 md:my-36 my-28 text-black text-center font-semibold">{error}</p>
                }
                {
                    isLoading ?
                        (
                            <p className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-44 md:my-36 my-28 text-black text-center font-semibold">Loading...</p>
                        ) : (
                            <>
                                <div className="flex lg:flex-row flex-col lg:gap-3 md:gap-9 gap-7 lg:mt-12 md:mt-10 mt-6 items-start">
                                    {
                                        cartInfo?.products?.length === 0 ?
                                            <div className="w-full">
                                                <h2 className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-40 md:my-28 my-20 text-black text-center font-semibold">No product is added into cart!</h2>
                                            </div> :
                                            <>
                                                {
                                                    cartInfo?.products?.length > 0 &&
                                                    <>
                                                        <div className="lg:w-2/3 w-full flex flex-col lg:gap-4 md:gap-3 gap-[10px] lg:h-[480px] md:max-h-[540px] max-h-[580px] overflow-y-auto lg:pr-3 md:pr-2 pr-0">
                                                            {
                                                                cartInfo?.products?.map((product) => (
                                                                    <div key={product?.cartItemId} className="flex items-start justify-between border-2 border-purple-800 rounded-xl lg:p-4 md:p-3 p-2 shadow-md hover:bg-purple-800 bg-purple-200 text-black hover:text-white hover:duration-300">
                                                                        <div className="flex items-center justify-between w-[96%]">
                                                                            <div className="flex items-center lg:gap-8 md:gap-5 gap-3">
                                                                                <div className="lg:h-44 md:h-36 h-28 lg:w-36 md:w-28 w-24">
                                                                                    <img className="h-full w-full" src={product?.image} alt="product" />
                                                                                </div>
                                                                                <div className="flex flex-col lg:gap-3 md:gap-2 gap-1">
                                                                                    <h4 className="md:block hidden lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">ID:</span> {product?.cartItemId}</h4>
                                                                                    <h4 className="lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">Product Name:</span> {product?.title}</h4>
                                                                                    <h4 className="lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">Size:</span> {product?.selectedSize}</h4>
                                                                                    <div className="flex items-center lg:gap-3 md:gap-2 gap-1">
                                                                                        <p className="lg:text-lg md:text-base text-sm font-semibold">Quantity: </p>
                                                                                        <div className="flex items-center lg:text-xl md:text-lg text-base font-semibold lg:gap-3 md:gap-[10px] gap-2">
                                                                                            {/* <h4 className="border-2 border-[#787878] bg-white lg:p-2 p-1 rounded-lg text-black" onClick={handleDecreaseProduct}><FaMinus className="lg:text-sm text-xs" /></h4> */}
                                                                                            <h4 className="font-bold">{product?.productQuantity}</h4>
                                                                                            {/* <h4 className="border-2 border-[#787878] bg-white lg:p-2 p-1 rounded-lg text-black" onClick={handleIncreaseProduct}><FaPlus className="lg:text-sm text-xs" /></h4> */}
                                                                                        </div>
                                                                                    </div>
                                                                                    <h4 className="md:hidden visible lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">Price:</span> ${`${product?.price * product?.productQuantity}`}</h4>

                                                                                    {/* <h2 className="lg:text-xl md:text-lg text-base font-bold">${`${product?.price * product?.productQuantity}`}</h2> */}
                                                                                </div>
                                                                            </div>
                                                                            <h2 className="md:block hidden lg:text-xl md:text-lg text-base font-bold">${`${product?.price * product?.productQuantity}`}</h2>
                                                                        </div>
                                                                        <FaXmark onClick={() => handleDeleteProduct(product?.cartItemId)} className="lg:text-2xl md:text-2xl text-xl md:p-1 p-[2px] bg-white border-2 border-purple-800 rounded-full text-slate-900" />
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </>
                                                }
                                            </>
                                    }

                                    {
                                        cartInfo?.products?.length > 0 &&
                                        <>
                                            {/* order summary */}
                                            <div className="lg:w-1/3 md:w-2/3 w-full lg:h-[480px] lg:mx-0 mx-auto border-2 border-purple-800 rounded-xl lg:px-5 lg:py-7 md:p-6 p-4 shadow-lg">
                                                <h2 className="text-black font-semibold lg:text-3xl md:text-2xl text-xl">Order Details</h2>
                                                <div className="lg:mt-16 md:mt-10 mt-8 flex flex-col lg:gap-4 md:gap-3 gap-2">
                                                    <div className="flex justify-between">
                                                        <p className="font-medium lg:text-lg md:text-base text-sm">Subtotal</p>
                                                        <p className="font-semibold lg:text-lg md:text-base text-sm"><span className="font-bold">$</span> {`${cartInfo?.subTotal}`}</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="font-medium lg:text-lg md:text-base text-sm">Shipping</p>
                                                        <p className="font-semibold lg:text-lg md:text-base text-sm"><span className="font-bold">$</span> {cartInfo?.cartQuantity * 5}</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="font-medium lg:text-lg md:text-base text-sm">Tax</p>
                                                        <p className="font-semibold lg:text-lg md:text-base text-sm"> <span className="font-bold">$</span> {(cartInfo?.subTotal * 0.05).toFixed(2)}</p>
                                                    </div>
                                                    <div className="flex justify-between lg:pt-5 md:pt-4 pt-3 border-t-2">
                                                        <p className="font-semibold lg:text-2xl md:text-xl text-lg">Total</p>
                                                        <p className="font-bold lg:text-2xl md:text-xl text-lg"><span className="font-bold">$</span>{`${Math.round((cartInfo?.subTotal) + ((cartInfo?.cartQuantity) * 5) + ((cartInfo?.subTotal) * 0.05))}`}                                    </p>
                                                        {/* <p className="font-bold lg:text-2xl md:text-xl text-lg"><span className="font-bold">$</span> {`${(cartInfo?.subTotal) + ((cartInfo?.cartQuantity) * 5) + (parseFloat(((cartInfo?.subTotal) * 0.05).toFixed(2)))}`} */}
                                                    </div>
                                                </div>
                                                <StripeCheckout
                                                    name="Stylish Fashion"
                                                    image="https://i.ibb.co/v4gKvy3/Icon.png"
                                                    billingAddress
                                                    shippingAddress
                                                    // description={`Your total is $${cartInfo?.total}`}
                                                    // amount={cartInfo?.total * 100}
                                                    description={`Your total is ${Math.round((cartInfo?.subTotal) + ((cartInfo?.cartQuantity) * 5) + ((cartInfo?.subTotal) * 0.05))}`}
                                                    amount={`${Math.round((cartInfo?.subTotal) + ((cartInfo?.cartQuantity) * 5) + ((cartInfo?.subTotal) * 0.05))}` * 100}

                                                    // description={`Your total is ${(cartInfo?.subTotal) + ((cartInfo?.cartQuantity) * 5) + (parseFloat(((cartInfo?.subTotal) * 0.05).toFixed(2)))}`}
                                                    // amount={`${(cartInfo?.subTotal) + ((cartInfo?.cartQuantity) * 5) + (parseFloat(((cartInfo?.subTotal) * 0.05).toFixed(2)))}` * 100}
                                                    token={handleToken}
                                                    stripeKey={Stripe_Key}
                                                >
                                                    <button className="lg:mt-16 md:mt-14 mt-12 flex mx-auto justify-center md:py-2 py-[6px] lg:w-44 md:w-36 w-32 text-white font-semibold lg:text-lg rounded-lg bg-gradient-to-r from-blue-600 to-purple-800 shadow-lg">
                                                        Checkout Now
                                                    </button>
                                                </StripeCheckout>
                                            </div>
                                        </>
                                    }
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    );
};

export default Cart;