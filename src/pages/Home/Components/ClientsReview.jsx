import { useState, useEffect } from 'react';
import client1Real from '../../../assets/Images/Home/ClientsReview_reviewer1.jpg';
import client2Real from '../../../assets/Images/Home/ClientsReview_reviewer2.jpg';
import client3Real from '../../../assets/Images/Home/ClientsReview_reviewer3.jpg';
import client4Real from '../../../assets/Images/Home/ClientsReview_reviewer4.jpg';
import client5Real from '../../../assets/Images/Home/ClientsReview_reviewer5.jpg';
import client6Real from '../../../assets/Images/Home/ClientsReview_reviewer6.png';
import client1 from '../../../assets/Images/Home/ClientsReview_reviewer1Shadow.png';
import client2 from '../../../assets/Images/Home/ClientsReview_reviewer2Shadow.png';
import client3 from '../../../assets/Images/Home/ClientsReview_reviewer3Shadow.png';
import client4 from '../../../assets/Images/Home/ClientsReview_reviewer4Shadow.png';
import client5 from '../../../assets/Images/Home/ClientsReview_reviewer5Shadow.png';
import client6 from '../../../assets/Images/Home/ClientsReview_reviewer6Shadow.png';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const clientReviewData = [
    {
        id: 1,
        image1: client1Real,
        image2: client2,
        image3: client3,
        image4: client4,
        image5: client5,
        image6: client6,
        review: "I absolutely love the variety and quality of the clothing at Stylish Fashion. Their seasonal collections are always on point, and I can always find something that fits perfectly. The customer service is outstanding too!",
        clientName: "Jack Lamba"
    },
    {
        id: 2,
        image1: client1,
        image2: client2Real,
        image3: client3,
        image4: client4,
        image5: client5,
        image6: client6,
        review: "Stylish Fashion has become my go-to for all my fashion needs. The trending styles section always keeps me updated with the latest fashion, and their eco-friendly options make me feel good about my purchases",
        clientName: "Sarah Santom"
    },
    {
        id: 3,
        image1: client1,
        image2: client2,
        image3: client3Real,
        image4: client4,
        image5: client5,
        image6: client6,
        review: "I recently bought a dress for a wedding from Stylish Fashion, and it was a hit! The quality was amazing, and I got so many compliments. The best part? I got it on sale! Love this store!",
        clientName: "Justin Leo"
    },
    {
        id: 4,
        image1: client1,
        image2: client2,
        image3: client3,
        image4: client4Real,
        image5: client5,
        image6: client6,
        review: "Shopping for my kids has never been easier. Stylish Fashion has a fantastic range of kids' wear that is both stylish and durable. My children love their new outfits, and I appreciate the affordable prices.",
        clientName: "Emily Moon"
    },
    {
        id: 5,
        image1: client1,
        image2: client2,
        image3: client3,
        image4: client4,
        image5: client5Real,
        image6: client6,
        review: "I’m a regular shopper at Stylish Fashion, and I must say their new arrivals always excite me. The clothing is trendy, comfortable, and always makes me feel confident. Highly recommend this store!",
        clientName: "Mickel Kelvin"
    },
    {
        id: 6,
        image1: client1,
        image2: client2,
        image3: client3,
        image4: client4,
        image5: client5,
        image6: client6Real,
        review: "Stylish Fashion never disappoints. The best-sellers section always has something that catches my eye, and their fast shipping ensures I get my items quickly. Plus, their customer support is top-notch!",
        clientName: "Reo Jessica"
    },
];

const SingleClientReview = ({ singleReview, goToSlide }) => {
    const { id, image1, image2, image3, image4, image5, image6, review, clientName } = singleReview;
    return (
        <div className="text-center lg:w-4/5 w-5/6">
            <div className='md:flex md:flex-row grid grid-cols-3 md:gap-0 gap-5 justify-between lg:mb-12 md:mb-10 mb-6'>
                <img onClick={() => goToSlide(0)} src={image1} alt={`Client ${id}`} className={`rounded-full lg:w-36 lg:h-36 md:w-[85px] md:h-[85px] w-20 h-20 cursor-pointer border-[6px] ${id === 1 ? " border-purple-800 shadow-lg" : "border-slate-400"}`} />
                <img onClick={() => goToSlide(1)} src={image2} alt={`Client ${id}`} className={`rounded-full lg:w-36 lg:h-36 md:w-[85px] md:h-[85px] w-20 h-20 cursor-pointer border-[6px] ${id === 2 ? " border-purple-800 shadow-lg" : "border-slate-400"}`} />
                <img onClick={() => goToSlide(2)} src={image3} alt={`Client ${id}`} className={`rounded-full lg:w-36 lg:h-36 md:w-[85px] md:h-[85px] w-20 h-20 cursor-pointer border-[6px] ${id === 3 ? " border-purple-800 shadow-lg" : "border-slate-400"}`} />
                <img onClick={() => goToSlide(3)} src={image4} alt={`Client ${id}`} className={`rounded-full lg:w-36 lg:h-36 md:w-[85px] md:h-[85px] w-20 h-20 cursor-pointer border-[6px] ${id === 4 ? " border-purple-800 shadow-lg" : "border-slate-400"}`} />
                <img onClick={() => goToSlide(4)} src={image5} alt={`Client ${id}`} className={`rounded-full lg:w-36 lg:h-36 md:w-[85px] md:h-[85px] w-20 h-20 cursor-pointer border-[6px] ${id === 5 ? " border-purple-800 shadow-lg" : "border-slate-400"}`} />
                <img onClick={() => goToSlide(5)} src={image6} alt={`Client ${id}`} className={`rounded-full lg:w-36 lg:h-36 md:w-[85px] md:h-[85px] w-20 h-20 cursor-pointer border-[6px] ${id === 6 ? " border-purple-800 shadow-lg" : "border-slate-400"}`} />
            </div>
            <div className="border-[3px] lg:py-10 md:py-5 py-4 lg:px-8 md:px-5 px-3 border-purple-800 rounded-lg shadow-lg bg-purple-200">
                <p className="text-black text-justify lg:text-lg/loose md:text-base/loose text-sm/relaxed font-medium">{review}</p>
                <p className="font-semibold lg:mt-16 md:mt-10 mt-6 text-right text-black lg:text-2xl md:text-xl text-lg">- {clientName}</p>
            </div>
        </div>
    );
};

const ClientReview = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clientReviewData.length);
    };
    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + clientReviewData.length) % clientReviewData.length);
    };
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const intervalId = setInterval(goToNextSlide, 3000); // Autoplay interval (3 seconds)
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [currentIndex]);

    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-20 md:mt-16 mt-14">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">Clients Review</h1>
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Dive into the stories of our satisfied customers and their experiences with our products.</p>
            </div>
            <div className="flex items-start justify-between lg:mt-14 md:mt-8 mt-5">
                <button onClick={goToPrevSlide} className="text-white bg-purple-800 rounded-full lg:mt-10 md:mt-7 mt-20">
                    <FaAngleLeft className='text-2xl border-2 border-purple-950 lg:w-10 lg:h-10 md:w-8 md:h-8 rounded-full lg:p-2 p-1' />
                </button>
                <SingleClientReview singleReview={clientReviewData[currentIndex]} goToSlide={goToSlide} />
                <button onClick={goToNextSlide} className="text-white bg-purple-800 rounded-full lg:mt-10 md:mt-7 mt-20">
                    <FaAngleRight className='text-2xl border-2 border-purple-950 lg:w-10 lg:h-10 md:w-8 md:h-8 rounded-full lg:p-2 p-1' />
                </button>
            </div>
        </div>
    );
};

export default ClientReview;