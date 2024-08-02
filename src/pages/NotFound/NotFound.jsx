import { Link } from "react-router-dom";
import banner from "../../assets/Images/NotFound/NotFound_banner.png";

const NotFound = () => {
    return (
        <div className="lg:mt-5 md:mt-28 mt-20 flex justify-center items-center lg:gap-1 flex-col">
            <img className="lg:w-[650px] lg:h-[480px] md:w-[380px] w-[300px] h-auto" src={banner} alt="Not Found Image" />
            <h3 className="lg:text-4xl font-bold md:text-3xl text-2xl">The page is not found !!!</h3>
            <Link to="/">
                <button className="md:text-lg text-base bg-gradient-to-r from-blue-600 to-purple-800 text-white lg:py-3 md:py-[10px] lg:px-8 md:px-6 px-4 py-2 lg:w-56 md:w-48 w-40 rounded-xl font-semibold lg:text-lg lg:mt-12 md:mt-10 mt-8">Go Back Home</button>
            </Link>
        </div>
    );
};

export default NotFound;