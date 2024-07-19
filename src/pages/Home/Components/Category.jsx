import { Link } from "react-router-dom";
import category1 from "../../../assets/Images/Home/Category_category1.jpg";
import category2 from "../../../assets/Images/Home/Category_category2.jpg";
import category3 from "../../../assets/Images/Home/Category_category3.jpg";

const Category = () => {
    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-20 md:mt-16 mt-14">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">Categories of Products</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-900">Categories of Products</h1> */}
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Explore our categories and find the perfect outfits for every member of your family at Stylish Fashion!</p>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-5 gap-4 lg:mt-14 md:mt-8 mt-5">
                <div className="relative transition-transform duration-500 transform hover:scale-105 shadow-lg">
                    <img src={category1} alt="category1" className="w-full h-auto" />
                    <div className="absolute inset-0 flex flex-col items-center lg:gap-6 md:gap-5 gap-4 justify-center bg-black bg-opacity-50">
                        <h2 className="text-white lg:text-3xl md:text-2xl text-xl font-bold">Men Wear</h2>
                        <Link to="/menFashion" className="">
                            <button className="py-2 lg:w-36 md:w-36 w-32 text-white font-semibold lg:text-lg rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-purple-800">Visit Now</button>
                        </Link>
                    </div>
                </div>
                <div className="relative transition-transform duration-500 transform hover:scale-105 shadow-lg">
                    <img src={category2} alt="category2" className="w-full h-auto" />
                    <div className="absolute inset-0 flex flex-col items-center lg:gap-6 md:gap-5 gap-4 justify-center bg-black bg-opacity-50">
                        <h2 className="text-white lg:text-3xl md:text-2xl text-xl font-bold">Women Wear</h2>
                        <Link to="/womenFashion" className="">
                            <button className="py-2 lg:w-36 md:w-36 w-32 text-white font-semibold lg:text-lg rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-purple-800">Visit Now</button>
                        </Link>
                    </div>
                </div>
                <div className="relative transition-transform duration-500 transform hover:scale-105 shadow-lg">
                    <img src={category3} alt="category3" className="w-full h-auto" />
                    <div className="absolute inset-0 flex flex-col items-center lg:gap-6 md:gap-5 gap-4 justify-center bg-black bg-opacity-50">
                        <h2 className="text-white lg:text-3xl md:text-2xl text-xl font-bold">Kids Wear</h2>
                        <Link to="/kidsFashion" className="">
                            <button className="py-2 lg:w-36 md:w-36 w-32 text-white font-semibold lg:text-lg rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-purple-800">Visit Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Category;