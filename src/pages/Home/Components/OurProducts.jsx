import product1 from "../../../assets/Images/Home/OurProducts_menCap.jpg";
import product2 from "../../../assets/Images/Home/OurProducts_menHudi.jpg";
import product3 from "../../../assets/Images/Home/OurProducts_menJacket.jpg";
import product4 from "../../../assets/Images/Home/OurProducts_menPant.jpg";
import product5 from "../../../assets/Images/Home/OurProducts_menShirt.jpg";
import product6 from "../../../assets/Images/Home/OurProducts_menShorts.jpg";
import product7 from "../../../assets/Images/Home/OurProducts_menSuit.jpg";
import product8 from "../../../assets/Images/Home/OurProducts_menTshirt.jpg";
import product9 from "../../../assets/Images/Home/OurProducts_menWinterCoat.jpg";
import product10 from "../../../assets/Images/Home/OurProducts_womenBardotDress.jpg";
import product11 from "../../../assets/Images/Home/OurProducts_womenFormal.jpg";
import product12 from "../../../assets/Images/Home/OurProducts_womenMaxiCutDress.jpg";
import product13 from "../../../assets/Images/Home/OurProducts_womenPantDress.jpg";
import product14 from "../../../assets/Images/Home/OurProducts_womenShiftDress.jpg";
import product15 from "../../../assets/Images/Home/OurProducts_womenSkirtDress.jpg";
import product16 from "../../../assets/Images/Home/OurProducts_womenTopDress.jpg";
import product17 from "../../../assets/Images/Home/OurProducts_womenWinterCap.jpg";
import product18 from "../../../assets/Images/Home/OurProducts_womenWinterCoatDress.jpg";
import product19 from "../../../assets/Images/Home/OurProducts_boyCap.jpg";
import product20 from "../../../assets/Images/Home/OurProducts_boySuit.jpg";
import product21 from "../../../assets/Images/Home/OurProducts_boyTshirtSet.jpg";
import product22 from "../../../assets/Images/Home/OurProducts_boyWinterDress.jpg";
import product23 from "../../../assets/Images/Home/OurProducts_girlCap.jpg";
import product24 from "../../../assets/Images/Home/OurProducts_girlFrog.jpg";
import product25 from "../../../assets/Images/Home/OurProducts_girlSkirtSet.jpg";
import product26 from "../../../assets/Images/Home/OurProducts_girlWinterDress.jpg";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { publicRequest } from "../../../helpers/axios/requestMethod";

const OurProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    // for normal data show
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await publicRequest.get("/products");
                // console.log(res?.data);
                setAllProducts(res?.data.slice(0, 12));
            } catch (error) {
                console.log(error)
            }
        };
        getAllProducts();
    }, []);

    return (
        <>
            {
                allProducts?.length > 0 &&
                <div className="lg:px-20 md:px-12 px-6 lg:mt-6 md:mt-6 mt-6">
                    {/* <div className="lg:px-20 md:px-12 px-6 lg:mt-20 md:mt-16 mt-14"> */}
                    <div>
                        <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">Our Products</h1>
                        {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">Our Products</h1> */}
                        <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Explore our extensive selection and enjoy a seamless shopping experience at Stylish Fashion!</p>
                    </div>
                    <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 lg:gap-6 md:gap-5 gap-4 lg:mt-12 md:mt-10 mt-7">
                        {
                            allProducts?.map((product) => (
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
                    <Link to="/allProducts">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:w-56 md:w-48 w-44 py-2 rounded-2xl lg:text-lg text-base font-semibold flex justify-center mx-auto lg:mt-14 md:mt-12 mt-10 items-center md:gap-2 gap-1">
                            See All Product <MdArrowOutward className="lg:text-xl text-lg" />
                        </button>
                    </Link>
                </div >
            }
        </>
    );
};

export default OurProducts;