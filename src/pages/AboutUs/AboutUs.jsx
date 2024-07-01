
const AboutUs = () => {
    return (
        <div>
            <div className='bg-purple-800 lg:py-48 md:py-28 py-20'>
                <h1 className='lg:text-8xl/relaxed md:text-7xl/normal text-4xl/relaxed text-white font-semibold text-center'>About Us</h1>
            </div>
            <div className="lg:px-28 md:px-12 px-6 lg:pt-20 md:pt-14 pt-10 text-justify">
                <div className="lg:pb-4 md:pb-2 pb-1">
                    <div className="text-black flex flex-col lg:gap-10 md:gap-7 gap-5">
                        <h3 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-purple-800 text-left">About Us</h3>
                        <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed">Welcome to <span className="font-semibold">Stylish Fashion</span>, your ultimate destination for contemporary and timeless clothing. At Stylish Fashion, we believe that fashion is more than just clothing—it's an expression of individuality, confidence, and style.</p>
                    </div>
                    <div className="lg:mt-12 md:mt-10 mt-8 text-black flex flex-col lg:gap-5 md:gap-4 gap-3">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-purple-800">Our Story</h3>
                        <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed">Founded with a passion for fashion and a commitment to quality, <span className="font-semibold">Stylish Fashion</span> aims to bring you the best in men's, women's, and kids' wear. Our journey began with a simple vision: to create a one-stop-shop where every family member can find their perfect outfit. From chic casual wear to elegant formal attire, our collections are thoughtfully curated to cater to diverse tastes and preferences.</p>
                    </div>
                    <div className="lg:mt-12 md:mt-10 mt-8 text-black flex flex-col lg:gap-5 md:gap-4 gap-3">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-purple-800">Our Mission</h3>
                        <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed">Our mission is to provide high-quality, stylish, and affordable clothing that enhances your wardrobe and boosts your confidence. We strive to stay ahead of the fashion curve, offering the latest trends and timeless classics to our valued customers.</p>
                    </div>
                    <div className="lg:mt-12 md:mt-10 mt-8 text-black flex flex-col lg:gap-5 md:gap-4 gap-3">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-purple-800">What We Offer</h3>
                        <div>
                            <ul className='flex flex-col gap-[10px] list-disc lg:pl-16 md:pl-10 pl-7 lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed'>
                                <li className=''><span className="font-semibold">Diverse Collections: </span>Explore our wide range of clothing options for men, women, and kids. Whether you're looking for everyday essentials, workwear, or special occasion outfits, we've got you covered.</li>
                                <li className=''><span className="font-semibold">Quality Fabrics:  </span>We use only the finest materials to ensure that every piece is comfortable, durable, and stylish.</li>
                                <li className=''><span className="font-semibold">Sustainable Fashion: </span>We are committed to sustainable practices and strive to reduce our environmental impact through eco-friendly materials and ethical production processes.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:mt-12 md:mt-10 mt-8 text-black flex flex-col lg:gap-5 md:gap-4 gap-3">
                        <h3 className="lg:text-3xl md:text-2xl text-xl font-semibold text-purple-800">Our Promise</h3>
                        <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed">At <span className="font-semibold">Stylish Fashion</span>, customer satisfaction is our top priority. We offer excellent customer service, secure shopping, and a hassle-free return policy to ensure a smooth and enjoyable shopping experience.</p>
                    </div>
                    <p className="lg:text-xl/relaxed md:text-lg/relaxed text-base/relaxed lg:mt-12 md:mt-10 mt-8 text-black ">Thank you for choosing <span className="font-semibold">Stylish Fashion</span>. We look forward to helping you discover your unique style and celebrate your fashion journey with us.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;