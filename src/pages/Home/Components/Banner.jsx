import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import banner1 from "../../../assets/Images/Home/Banner_banner1.png";
import banner2 from "../../../assets/Images/Home/Banner_banner2.png";
import banner3 from "../../../assets/Images/Home/Banner_banner3.png";
import banner4 from "../../../assets/Images/Home/Banner_banner4.png";
import banner5 from "../../../assets/Images/Home/Banner_banner5.png";
import banner6 from "../../../assets/Images/Home/Banner_banner6.png";
import { Link } from "react-router-dom";

const bannerData = [
    {
        id: 1,
        image: banner1,
        description: "Discover the latest trends in men’s, women’s, and kids' wear. At Stylish Fashion, we offer a curated collection of stylish and affordable clothing to keep your wardrobe fresh and fashionable. Shop now and elevate your style with our exclusive collections designed for every occasion!",
        bannerTitle: "Stylish Fashion",
        backgroundColor: "bg-slate-300"
    },
    {
        id: 2,
        image: banner2,
        description: "Discover the latest trends in men’s, women’s, and kids' wear. At Stylish Fashion, we offer a curated collection of stylish and affordable clothing to keep your wardrobe fresh and fashionable. Shop now and elevate your style with our exclusive collections designed for every occasion!",
        bannerTitle: "Stylish Fashion", backgroundColor: "bg-yellow-100"
    },
    {
        id: 3,
        image: banner3,
        description: "Discover the latest trends in men’s, women’s, and kids' wear. At Stylish Fashion, we offer a curated collection of stylish and affordable clothing to keep your wardrobe fresh and fashionable. Shop now and elevate your style with our exclusive collections designed for every occasion!",
        bannerTitle: "Stylish Fashion",
        backgroundColor: "bg-red-100"
    },
    {
        id: 4,
        image: banner4,
        description: "Discover the latest trends in men’s, women’s, and kids' wear. At Stylish Fashion, we offer a curated collection of stylish and affordable clothing to keep your wardrobe fresh and fashionable. Shop now and elevate your style with our exclusive collections designed for every occasion!",
        bannerTitle: "Stylish Fashion",
        backgroundColor: "bg-stone-300"
    },
    {
        id: 5,
        image: banner5,
        description: "Discover the latest trends in men’s, women’s, and kids' wear. At Stylish Fashion, we offer a curated collection of stylish and affordable clothing to keep your wardrobe fresh and fashionable. Shop now and elevate your style with our exclusive collections designed for every occasion!",
        bannerTitle: "Stylish Fashion", backgroundColor: "bg-indigo-100"
    },
    {
        id: 6,
        image: banner6,
        description: "Discover the latest trends in men’s, women’s, and kids' wear. At Stylish Fashion, we offer a curated collection of stylish and affordable clothing to keep your wardrobe fresh and fashionable. Shop now and elevate your style with our exclusive collections designed for every occasion!",
        bannerTitle: "Stylish Fashion",
        backgroundColor: "bg-emerald-100"
    },
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerData.length) % bannerData.length);
    };

    useEffect(() => {
        const intervalId = setInterval(goToNextSlide, 3000); // Autoplay interval (3 seconds)
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);
    return (
        <div className="w-full lg:h-[600px] md:h-[680px] h-[576px] relative ">
            {bannerData?.map((singleBanner, index) => (
                <div
                    key={singleBanner?.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'} ${singleBanner.backgroundColor}`}>
                    <div className='lg:py-0 md:py-5 py-3 lg:px-24 md:px-12 px-8 rounded-lg lg:grid flex lg:grid-cols-2 flex-col items-center lg:gap-0 md:gap-8 gap-4 w-full lg:h-[600px] md:h-[680px] h-[576px] '>
                        <img className="lg:w-full md:w-[60%] w-[85%] lg:h-auto md:h-[330px] h-[200px]" src={singleBanner?.image} alt="image" />
                        <div className="lg:text-left text-center">
                            <p className="lg:text-5xl/normal md:text-4xl/normal text-3xl font-bold">Welcome to  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-800 italic" style={{ fontFamily: "Playwrite NL" }}>{singleBanner?.bannerTitle}</span></p>
                            <p className="font-medium lg:mt-6 md:mt-4 mt-3 text-justify text-[#121212] lg:text-xl/normal md:text-lg text-base"> {singleBanner?.description}</p>
                            <Link to="" className="">
                                <button className="lg:mt-14 md:mt-7 mt-7 py-2 lg:w-40 md:w-36 w-32 text-white font-semibold lg:text-lg rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-purple-800">Shop Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            <button
                className="absolute left-5 top-1/2 transform -translate-y-1/2"
                onClick={goToPrevSlide}>
                <FaAngleLeft className='text-2xl border-2 border-[#121212] bg-white lg:w-10 lg:h-10 md:w-8 md:h-8 rounded-full lg:p-2 p-1' />
            </button>
            <button
                className="absolute right-5 top-1/2 transform -translate-y-1/2"
                onClick={goToNextSlide}>
                <FaAngleRight className='text-2xl border-2 border-[#121212] bg-white lg:w-10 lg:h-10 md:w-8 md:h-8 rounded-full lg:p-2 p-1' />
            </button>
        </div>
    );
};

export default Banner;