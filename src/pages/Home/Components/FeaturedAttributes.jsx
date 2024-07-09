
const FeaturedAttributes = () => {
    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-20 md:mt-16 mt-14">
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">Featured Attributes</h1>
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Explore the standout features and benefits of our products, designed to offer you the best in style, comfort, and quality.</p>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-6 gap-5 lg:mt-12 md:mt-10 mt-7">
                <div className="bg-purple-100 lg:py-8 lg:px-6 md:py-6 md:px-5 py-5 px-4 rounded-2xl transition-transform duration-500 transform hover:scale-105 border-purple-800 border-2 hover:shadow-lg">
                    {/* <img className="mx-auto lg:mb-5 md:mb-4 mb-3 lg:w-20 md:w-[72px] w-16" src={feature1} alt="feature1" /> */}
                    <h4 className="lg:text-2xl/normal text-black font-semibold md:text-xl/normal text-lg/normal text-center lg:mb-5 md:mb-4 mb-3">High-Quality Fabrics</h4>
                    <p className="text-black md:text-base/relaxed text-sm/relaxed font-medium text-center">Ensures durability and comfort by including the variety of materials such as cotton, linen, silk, and wool.</p>
                </div>
                <div className="bg-purple-100 lg:py-8 lg:px-6 md:py-6 md:px-5 py-5 px-4 rounded-2xl transition-transform duration-500 transform hover:scale-105 border-purple-800 border-2 hover:shadow-lg">
                    {/* <img className="mx-auto lg:mb-5 md:mb-4 mb-3 lg:w-20 md:w-[72px] w-16" src={feature2} alt="feature2" /> */}
                    <h4 className="lg:text-2xl/normal text-black font-semibold md:text-xl/normal text-lg/normal text-center lg:mb-5 md:mb-4 mb-3">Trendy Designs</h4>
                    <p className="text-black md:text-base/relaxed text-sm/relaxed font-medium text-center">Features the latest and exclusive fashion trends for men, women, and kids in reasonable price.</p>
                </div>
                <div className="bg-purple-100 lg:py-8 lg:px-6 md:py-6 md:px-5 py-5 px-4 rounded-2xl transition-transform duration-500 transform hover:scale-105 border-purple-800 border-2 hover:shadow-lg">
                    {/* <img className="mx-auto lg:mb-5 md:mb-4 mb-3 lg:w-20 md:w-[72px] w-16" src={feature3} alt="feature3" /> */}
                    <h4 className="lg:text-2xl/normal text-black font-semibold md:text-xl/normal text-lg/normal text-center lg:mb-5 md:mb-4 mb-3">Wide Range of Sizes</h4>
                    <p className="text-black md:text-base/relaxed text-sm/relaxed font-medium text-center">Inclusive sizing for all body types including petite and plus-size clothing with stylish design.</p>
                </div>
                <div className="bg-purple-100 lg:py-8 lg:px-6 md:py-6 md:px-5 py-5 px-4 rounded-2xl transition-transform duration-500 transform hover:scale-105 border-purple-800 border-2 hover:shadow-lg">
                    {/* <img className="mx-auto lg:mb-5 md:mb-4 mb-3 lg:w-20 md:w-[72px] w-16" src={feature4} alt="feature4" /> */}
                    <h4 className="lg:text-2xl/normal text-black font-semibold md:text-xl/normal text-lg/normal text-center lg:mb-5 md:mb-4 mb-3">Sustainable Practices</h4>
                    <p className="text-black md:text-base/relaxed text-sm/relaxed font-medium text-center">Eco-friendly materials and manufacturing processes which commit to reducing environmental impact</p>
                </div>
            </div>
        </div>
    );
};

export default FeaturedAttributes;