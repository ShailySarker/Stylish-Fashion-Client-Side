import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const Banner = () => {
    return (
        <div className="w-full h-[600px] flex items-center justify-between bg-purple-500 ">
            <FaAngleLeft className="bg-white w-12 h-12 shadow-lg rounded-full p-[14px] ml-10"/>
            <div>
            </div>
            <FaAngleRight className="bg-white w-12 h-12 shadow-lg rounded-full p-[14px] mr-10"/>
        </div>
    );
};

export default Banner;