import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/api/orderCalls";
import Loader from "../../components/Loader";

const OrderTracking = () => {
    const dispatch = useDispatch();
    const orderInfo = useSelector((state) => state?.order?.orders);
    console.log(orderInfo)
    const currentUser = useSelector((state) => state?.user?.currentUser);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(fetchOrders(currentUser?._id));
        }
    }, [dispatch, currentUser?._id]);

    // if (!orders.length) {
    //     return <p>No orders found.</p>;
    // }

    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Order Tracking</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">My Selecting Product</h1> */}
                {/* <p className="lg:text-2xl/relaxed md:text-xl/relaxed text-lg/relaxed lg:my-48 md:my-40 my-32 text-black text-center font-semibold">Coming Soon!</p> */}

            </div>
            <div className="lg:mt-12 md:mt-10 mt-6">
                {/* {setLoading && <Loader/>} */}
                <div>
                    {
                        orderInfo?.length === 0 ?
                            <>
                            </> :
                            <>
                                {
                                    orderInfo?.length > 0 &&
                                    <>
                                        {/* Product table */}
                                        <div className="overflow-x-auto lg:max-h-[480px] md:max-h-[600px] max-h-[580px] overflow-y-auto">
                                            <table className="min-w-full divide-y divide-gray-300 border-2 border-purple-800 rounded-b-2xl">
                                                <thead className="bg-purple-800 sticky top-0 z-50">
                                                    <tr className="" >
                                                        <th className="lg:px-6 md:px-4 px-3 lg:py-3 md:py-4 py-3 text-left lg:text-sm text-xs font-semibold text-white uppercase tracking-wider">Order ID</th>
                                                        <th className="lg:px-6 md:px-4 px-3 lg:py-3 md:py-4 py-3 text-left lg:text-sm text-xs font-semibold text-white uppercase tracking-wider">Product</th>
                                                        <th className="lg:px-6 md:px-4 px-3 lg:py-3 md:py-4 py-3 text-left lg:text-sm text-xs font-semibold text-white uppercase tracking-wider">Quantity</th>
                                                        <th className="lg:px-6 md:px-4 px-3 lg:py-3 md:py-4 py-3 text-left lg:text-sm text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                                                        <th className="lg:px-6 md:px-4 px-3 lg:py-3 md:py-4 py-3 text-left lg:text-sm text-xs font-semibold text-white uppercase tracking-wider">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {
                                                        orderInfo?.map((order, index) => (
                                                            <tr key={order?._id} className={index % 2 === 0 ? 'bg-purple-200 text-black shadow-md' : 'bg-white text-black'}>
                                                                <td className="lg:px-6 md:px-4 px-3 lg:py-4 md:py-4 py-3 whitespace-nowrap text-sm font-medium ">{order?._id}</td>
                                                                <td className="lg:px-6 md:px-4 px-3 lg:py-3 md:py-4 py-3 whitespace-nowrap md:text-sm text-xs flex flex-col lg:gap-3 md:gap-4 gap-3">
                                                                    {
                                                                        order?.products?.map(product =>
                                                                            <div key={product?.cartItemId} className="flex lg:flex-row flex-col lg:items-center lg:gap-3 md:gap-2 gap-1">
                                                                                <img src={product?.image} alt={order?.name} className="lg:w-16 md:w-14 w-10 lg:h-20 md:h-16 h-12 object-cover rounded" />
                                                                                <div>
                                                                                    <p>Name: {product?.title}</p>
                                                                                    <p>Size: {product?.selectedSize}</p>
                                                                                    <p>Color: {product?.selectedColor}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </td>
                                                                <td className="lg:px-6 md:px-4 px-3 lg:py-3 md:py-4 py-3 whitespace-nowrap text-sm">{order?.products?.length}</td>
                                                                <td className={`lg:px-6 md:px-4 px-3 lg:py-3 md:py-4 py-3 whitespace-nowrap text-sm font-medium capitalize 
                                                             ${order?.status === 'pending' && 'text-amber-500'} 
                                                            ${order?.status === 'New Arrival' && 'text-green-600'} 
                                                            ${order?.status === 'Regular' && 'text-sky-600'}`}>
                                                                    {order?.status}
                                                                </td>
                                                                <td className="lg:px-6 md:px-4 px-3 lg:py-3 md:py-4 py-3 whitespace-nowrap text-sm"><span className="font-semibold">$</span> {order?.amount}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </>

                                }
                            </>

                    }
                </div>

            </div>
        </div>
    );
};

export default OrderTracking;

{/* <>
    {
        orderInfo?.map((order) => (
            <div key={order?._id} className="flex items-start justify-between border-2 border-purple-800 rounded-xl lg:p-4 md:p-3 p-2 shadow-md hover:bg-purple-800 bg-purple-200 text-black hover:text-white hover:duration-300">
                <p>{order?._id}</p>
                <p>{order?.products?.length}</p>
                <p>${order?.amount}</p>
                <p>{order?.status}</p>
                {/* <div>
                {
                    order?.products?.map(product => (
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
                                                <h4 className="font-bold">{product?.productQuantity}</h4>
                                            </div>
                                        </div>
                                        <h4 className="md:hidden visible lg:text-lg md:text-base text-sm font-medium"><span className="font-semibold">Price:</span> ${`${product?.price * product?.productQuantity}`}</h4>

                                    </div>
                                </div>
                                <h2 className="md:block hidden lg:text-xl md:text-lg text-base font-bold">${`${product?.price * product?.productQuantity}`}</h2>
                            </div>
                        </div>
                    ))
                }
            </div> */}
//             </div>
//         ))
//     }
// </> */}