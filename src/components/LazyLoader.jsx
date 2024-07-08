import Lottie from 'lottie-react';
import lazyLoaderAnimation from '../../LazyLoaderAnimation.json';
const LazyLoader = () => {
    return (
        <div className="flex flex-col justify-center items-center py-12">
            <div className='lg:w-[500px] md:w-96 w-64'>
                <Lottie loop={true} animationData={lazyLoaderAnimation} />
            </div>
        </div>
    );
};

export default LazyLoader;