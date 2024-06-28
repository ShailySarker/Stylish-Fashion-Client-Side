import './FeaturedBrands.css';
import brand1Logo from "../../../assets/Images/Home/FeaturedBrands_brand1.jpg";
import brand2Logo from "../../../assets/Images/Home/FeaturedBrands_brand2.jpg";
import brand3Logo from "../../../assets/Images/Home/FeaturedBrands_brand3.jpg";
import brand4Logo from "../../../assets/Images/Home/FeaturedBrands_brand4.jpg";
import brand5Logo from "../../../assets/Images/Home/FeaturedBrands_brand5.jpg";
import brand6Logo from "../../../assets/Images/Home/FeaturedBrands_brand6.jpg";
import brand7Logo from "../../../assets/Images/Home/FeaturedBrands_brand7.jpg";
import brand8Logo from "../../../assets/Images/Home/FeaturedBrands_brand8.jpg";
import brand9Logo from "../../../assets/Images/Home/FeaturedBrands_brand9.jpg";
import brand10Logo from "../../../assets/Images/Home/FeaturedBrands_brand10.jpg";
import brand11Logo from "../../../assets/Images/Home/FeaturedBrands_brand11.jpg";
import brand12Logo from "../../../assets/Images/Home/FeaturedBrands_brand12.jpg";
import brand13Logo from "../../../assets/Images/Home/FeaturedBrands_brand13.jpg";
import brand14Logo from "../../../assets/Images/Home/FeaturedBrands_brand14.jpg";
import brand15Logo from "../../../assets/Images/Home/FeaturedBrands_brand15.jpg";
import brand16Logo from "../../../assets/Images/Home/FeaturedBrands_brand16.jpg";

const brandsData = [
    {
        id: 1,
        companyLogo: brand1Logo
    },
    {
        id: 2,
        companyLogo: brand2Logo
    },
    {
        id: 3,
        companyLogo: brand3Logo
    },
    {
        id: 4,
        companyLogo: brand4Logo
    },
    {
        id: 5,
        companyLogo: brand5Logo
    },
    {
        id: 6,
        companyLogo: brand6Logo
    },
    {
        id: 7,
        companyLogo: brand7Logo
    },
    {
        id: 8,
        companyLogo: brand8Logo
    },
    {
        id: 9,
        companyLogo: brand9Logo
    },
    {
        id: 10,
        companyLogo: brand10Logo
    },
    {
        id: 11,
        companyLogo: brand11Logo
    },
    {
        id: 12,
        companyLogo: brand12Logo
    },
    {
        id: 13,
        companyLogo: brand13Logo
    },
    {
        id: 14,
        companyLogo: brand14Logo
    },
    {
        id: 15,
        companyLogo: brand15Logo
    },
    {
        id: 16,
        companyLogo: brand16Logo
    },
];

const FeaturedSingleBrandInfo = ({ companyLogo }) => {
    return (
        <div className='slide2 lg:h-[170px] lg:w-[250px] md:h-32 md:w-40 h-24 w-32 lg:px-3 md:px-2 px-[6px]'>
            <div className="mainBox2 shadow-lg border-[3px] border-purple-800 rounded-lg flex justify-center items-center lg:p-3 p-2">
                <img className='md:w-auto w-11/12 h-auto' src={companyLogo} alt="companyLogo" />
            </div>
        </div>
    );
};

const FeaturedBrands = () => {
    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-20 md:mt-16 mt-14">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">Featured Brands</h1>
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Discover the top brands that define style, quality, and fashion for men. From timeless classics to modern trends, explore a curated selection of the best names in men's wear.</p>
            </div>
            <div className='slider2 lg:py-14 md:py-10 py-8'>
                <div className='slide-track2'>
                    {
                        brandsData?.map(brand => (
                            <FeaturedSingleBrandInfo key={brand?.id} companyLogo={brand?.companyLogo} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default FeaturedBrands;