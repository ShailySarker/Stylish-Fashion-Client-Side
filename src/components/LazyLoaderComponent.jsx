import Lottie from "lottie-react";
import lazyLoaderComponentAnimation from "../../../LazyLoaderComponentAnimation.json";

const LazyLoaderComponent = () => {
    return (
        <div className="flex flex-col justify-center items-center py-12">
            <div className='lg:w-[450px] md:w-96 w-64'>
                <Lottie loop={true} animationData={lazyLoaderComponentAnimation} />
            </div>
        </div>
    );
};

export default LazyLoaderComponent;