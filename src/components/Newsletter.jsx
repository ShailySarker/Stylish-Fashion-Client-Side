
const Newsletter = () => {
    return (
        <div className="lg:px-20 md:px-12 px-6 lg:mt-20 md:mt-16 mt-14 bg-slate-100 lg:py-12 md:py-8 py-6">
            {/* <div className="lg:px-20 md:px-12 px-6 lg:mt-20 md:mt-16 mt-14 bg-gradient-to-r from-blue-100 to-purple-200 lg:py-12 md:py-8 py-6"> */}
            <div>
                <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-black">Get Newsletter</h1>
                {/* <h1 className="lg:text-4xl/normal md:text-3xl/normal text-2xl/normal font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-800">Get Newsletter</h1> */}
                <p className="text-center lg:w-[60%] md:w-[75%] w-[90%] mx-auto lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-4 md:mt-3 mt-2 text-black">Stay ahead of the latest fashion trends and exclusive offers with our Stylish Fashion Newsletter!</p>
            </div>
            <div className="lg:mt-16 md:mt-12 mt-8 flex justify-center">
                <form className="shadow-lg">
                    <input className="lg:py-3 md:py-[10px] py-2 lg:px-5 md:px-4 px-3 border-2 border-purple-800 rounded-l-xl lg:w-[400px] md:w-80 w-[224px]" type="email" name="email" id="" placeholder="Enter your email ..." />
                    <button className="lg:py-3 md:py-[10px] py-2 bg-gradient-to-r from-blue-600 to-purple-800 lg:w-36 md:w-32 w-[88px] rounded-r-xl md:text-lg text-white font-semibold md:border-0 border-r-2 border-y-2 border-purple-800" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;