import { useEffect, useState } from "react";
import product from "../../assets/Images/MenFashion/MenProducts_menCap.jpg";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { publicRequest } from "../../helpers/axios/requestMethod";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";

const SingleProductDetails = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [countProductQuantity, setCountProductQuantity] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                console.log(res?.data);
                setProduct(res?.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    }, [id]);

    const handleIncreaseProduct = () => {
        setCountProductQuantity(countProductQuantity + 1);
    };
    const handleDecreaseProduct = () => {
        if (countProductQuantity > 1) {
            setCountProductQuantity(countProductQuantity - 1);
        }
    };

    const handleAddToCart = () => {
        if (selectedColor) {
            if (selectedSize) {
                console.log(selectedColor, selectedSize, countProductQuantity);

                // api
                const addToCartInfo = {
                    ...product,
                    countProductQuantity,
                    selectedColor,
                    selectedSize
                };
                dispatch(addProduct(addToCartInfo));

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "The product is successfully added into cart!",
                    showConfirmButton: false,
                    timer: 2000
                });
                setSelectedColor("");
                setSelectedSize("");
                setCountProductQuantity(1);

                navigate("/cart");

            } else {
                alert("kindly select size");
            }
        } else {
            alert("kindly select color");
        }
    };

    return (
        <div className="flex md:flex-row flex-col items-center lg:gap-8 md:gap-7 gap-6 lg:px-20 md:px-12 px-6 lg:mt-5 md:mt-4 mt-3">
            <div className="lg:w-[40%] md:w-[35%]">
                <img className="lg:h-96 md:h-64 h-52" src={product?.image} alt="product image" />
            </div>
            <div className="lg:w-[60%] md:w-[65%]">
                <div>
                    <h2 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">{product?.title}</h2>
                    <p className="lg:mt-3 md:mt-2 mt-1 lg:text-lg/normal text-justify">{product?.desc}</p>
                    <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-purple-700 lg:mt-7 md:mt-5 mt-4">$ {product?.price}</h3>
                </div>
                <div className="lg:mt-7 md:mt-5 mt-4 flex flex-row lg:gap-16 md:gap-8 gap-0 md:justify-start justify-between">
                    {/* color */}
                    <div className="flex items-center lg:gap-3 md:gap-2 gap-1">
                        <p className="lg:text-lg font-semibold">Color: </p>
                        <div className="flex flex-wrap gap-2">
                            {
                                product?.color?.map(
                                    eachColor => (
                                        <span
                                            key={eachColor}
                                            className={`lg:w-6 lg:h-6 w-4 h-4 rounded-full ${selectedColor === eachColor ? ' border-2 border-purple-800' : 'border border-gray-300'}`}
                                            style={{ backgroundColor: eachColor }}
                                            title={eachColor}
                                            onClick={() => setSelectedColor(eachColor)}
                                        />
                                    )
                                )
                            }
                        </div>
                    </div>
                    {/* size */}
                    <div className="flex items-center lg:gap-3 md:gap-2 gap-1">
                        <h4 className="lg:text-lg text-base font-semibold">Size:</h4>
                        <select className="lg:py-2 md:py-[6px] py-1 lg:px-4 md:px-3 px-1 lg:text-lg text-base font-medium rounded-lg lg:w-28 md:w-24 w-[60px] border-2 border-[#787878]" onChange={(e) => setSelectedSize(e.target.value)}>
                            {
                                product?.size?.map(
                                    eachSize => (
                                        <option key={eachSize} value={eachSize}>{eachSize}</option>
                                    )
                                )
                            }
                        </select>
                    </div>
                    {/* quantity */}
                    <div className="flex items-center lg:gap-3 md:gap-2 gap-1">
                        <p className="lg:text-lg font-semibold">Quantity: </p>
                        <div className="flex items-center lg:text-xl md:text-lg text-base font-semibold lg:gap-3 md:gap-[10px] gap-2">
                            <h4 className="border-2 border-[#787878] bg-white lg:p-2 p-1 rounded-lg" onClick={handleDecreaseProduct}><FaMinus className="lg:text-sm text-xs" /></h4>
                            <h4 className="text-purple-700 font-semibold">{countProductQuantity}</h4>
                            <h4 className="border-2 border-[#787878] bg-white lg:p-2 p-1 rounded-lg" onClick={handleIncreaseProduct}><FaPlus className="lg:text-sm text-xs" /></h4>
                        </div>
                    </div>
                </div>
                <div className="flex lg:gap-4 md:gap-3 gap-2 lg:mt-8 md:mt-7 mt-6">
                    {/* <button className="lg:py-3 md:py-[10px] py-2 border-2 rounded-2xl bg-sky-700 text-white font-semibold lg:text-lg lg:w-44 md:w-40 w-36">Buy Now</button> */}
                    <button className="lg:py-3 md:py-[10px] py-2 border-2 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-800 text-white font-semibold lg:text-lg lg:w-44 md:w-40 w-36" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default SingleProductDetails;