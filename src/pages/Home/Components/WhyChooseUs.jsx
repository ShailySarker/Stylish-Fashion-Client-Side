const WhyChooseUs = () => {
    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-20 md:mt-16 mt-14">
            <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">Why Choose Us?</h1>
            <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Discover the convenience and quality of shopping with our clothing product online store, offering latest trendy fashion and expert suggestion for your stylish needs.</p>
            <div className="lg:mt-20 md:mt-16 mt-10 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-8 gap-3 lg:gap-6">
                <div className="bg-purple-100 rounded-xl lg:h-48 md:h-32 h-20 flex justify-center items-center shadow-lg text-center text-black border-2 border-purple-800 transition duration-300 ease-in-out hover:bg-purple-800 hover:text-white transform hover:scale-105">
                    <h3 className="lg:text-2xl md:text-xl text-lg font-semibold p-5 ">Trustable</h3>
                </div>
                <div className="bg-purple-100 rounded-xl lg:h-48 md:h-32 h-20 flex justify-center items-center shadow-lg text-center text-black border-2 border-purple-800 transition duration-300 ease-in-out hover:bg-purple-800 hover:text-white transform hover:scale-105">
                    <h3 className="lg:text-2xl md:text-xl text-lg font-semibold p-5 ">Best Quality</h3>
                </div>
                <div className="bg-purple-100 rounded-xl lg:h-48 md:h-32 h-20 flex justify-center items-center shadow-lg text-center text-black border-2 border-purple-800 transition duration-300 ease-in-out hover:bg-purple-800 hover:text-white transform hover:scale-105">
                    <h3 className="lg:text-2xl md:text-xl text-lg font-semibold p-5 ">Latest Fashion</h3>
                </div>
                <div className="bg-purple-100 rounded-xl lg:h-48 md:h-32 h-20 flex justify-center items-center shadow-lg text-center text-black border-2 border-purple-800 transition duration-300 ease-in-out hover:bg-purple-800 hover:text-white transform hover:scale-105">
                    <h3 className="lg:text-2xl md:text-xl text-lg font-semibold p-5 ">Easily to Order</h3>
                </div>
                <div className="bg-purple-100 rounded-xl lg:h-48 md:h-32 h-20 flex justify-center items-center shadow-lg text-center text-black border-2 border-purple-800 transition duration-300 ease-in-out hover:bg-purple-800 hover:text-white transform hover:scale-105">
                    <h3 className="lg:text-2xl md:text-xl text-lg font-semibold p-5 ">Quick Delivery</h3>
                </div>
                {/* <div className="bg-purple-400 rounded-xl lg:h-48 md:h-32 h-20 flex justify-center items-center shadow-lg text-center text-black border-2 border-purple-800 transition duration-300 ease-in-out hover:bg-purple-800 hover:text-white transform hover:scale-105">
                    <h3 className="lg:text-2xl md:text-xl text-lg font-semibold p-5 ">No Hidden Charge</h3>
                </div> */}
            </div>
        </div>
    );
};

export default WhyChooseUs;