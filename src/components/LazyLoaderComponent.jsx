import Lottie from "lottie-react";
import lazyLoaderComponentAnimation from "../../LazyLoaderComponentAnimation.json";

const LazyLoaderComponent = () => {
    return (
        <div className="flex flex-col justify-center items-center py-12">
            <div className='lg:w-96 md:w-72 w-56'>
                <Lottie loop={true} animationData={lazyLoaderComponentAnimation} />
            </div>
        </div>
    );
};

export default LazyLoaderComponent;