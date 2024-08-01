
const Loader = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="spinner-border animate-spin inline-block lg:w-40 md:w-32 w-24 lg:h-40 md:h-32 h-24 lg:border-[12px] md:border-8 border-[6px] border-current border-t-transparent text-purple-800 rounded-full" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
