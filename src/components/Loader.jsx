
const Loader = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-purple-800 rounded-full" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
